/**
 * Copy editing script for the copy-editing-evaluation skill.
 *
 * Analyses a markdown document and outputs JSON with five keys:
 * - `spelling` — misspelled words detected by cspell
 * - `forbiddenWords` — words or phrases from the flagged words list
 * - `headings` — heading hierarchy and capitalisation issues
 * - `formatting` — punctuation issues (em-dashes, etc.)
 * - `summary` — counts of issues by category
 *
 * The script uses cspell for spell checking and loads a forbidden words
 * list from the style guide directory. Heading checks (hierarchy and
 * sentence case) are implemented with custom logic.
 *
 * @example
 * ```bash
 * node copy-editing.js <file.md>
 * ```
 *
 * @module copy-editing
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import {
  getDefaultSettings,
  spellCheckDocument,
  type Issue as CSpellIssue,
} from "cspell-lib";

// ============================================================================
// Types
// ============================================================================

/** A spelling issue detected by cspell. */
interface SpellingIssue {
  /** The misspelled word. */
  word: string;
  /** The line number in the source file (1-indexed). */
  line: number;
  /** The character offset from the start of the file. */
  offset: number;
}

/** A forbidden word or phrase found in the document. */
interface ForbiddenWordIssue {
  /** The forbidden word or phrase that was found. */
  word: string;
  /** The line number in the source file (1-indexed). */
  line: number;
  /** The full line of text where the word was found. */
  lineText: string;
  /** The suggested replacement, if this is a word substitution rather than a strictly forbidden word. */
  suggestion?: string;
}

/** A heading hierarchy or capitalisation issue. */
interface HeadingIssue {
  /** The type of heading issue detected. */
  type: "skipped-level" | "multiple-h1" | "not-sentence-case";
  /** The line number in the source file (1-indexed). */
  line: number;
  /** The heading text. */
  text: string;
  /** A human-readable description of the issue. */
  message: string;
}

/** A formatting issue detected by custom checks. */
interface FormattingIssue {
  /** The type of formatting issue detected. */
  type: "em-dash";
  /** The line number in the source file (1-indexed). */
  line: number;
  /** The full line of text where the issue was found. */
  lineText: string;
  /** A human-readable description of the issue. */
  message: string;
}

/** Summary counts of issues by category. */
interface Summary {
  /** Number of spelling issues. */
  spelling: number;
  /** Number of forbidden word issues. */
  forbiddenWords: number;
  /** Number of heading issues. */
  headings: number;
  /** Number of formatting issues. */
  formatting: number;
  /** Total number of issues across all categories. */
  total: number;
}

/** The complete output of a copy editing analysis. */
interface Output {
  /** Misspelled words detected by cspell. */
  spelling: SpellingIssue[];
  /** Forbidden words or phrases from the style guide word list. */
  forbiddenWords: ForbiddenWordIssue[];
  /** Heading hierarchy and capitalisation issues. */
  headings: HeadingIssue[];
  /** Formatting issues (em-dashes, etc). */
  formatting: FormattingIssue[];
  /** Counts of issues by category. */
  summary: Summary;
}

// ============================================================================
// Forbidden words loading
//
// Reads the forbidden words list from forbidden-words.txt in the style guide
// directory. Lines starting with # are comments. Empty lines are skipped.
// ============================================================================

/** Path to the flagged words file, resolved relative to the style guide references directory. */
const FLAGGED_WORDS_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "dockit",
  "references",
  "flagged-words.txt"
);

/**
 * A flagged word entry parsed from flagged-words.txt.
 * Lines with an arrow (→) have a suggestion. Lines without are strictly forbidden.
 */
interface FlaggedWordEntry {
  /** The word or phrase to flag, lowercased. */
  word: string;
  /** The suggested replacement, or undefined if strictly forbidden. */
  suggestion?: string;
}

/**
 * Reads the flagged words file and returns an array of entries.
 * Each entry has a word to flag and an optional suggested replacement.
 *
 * Supported formats:
 * - `word` — strictly forbidden, no replacement
 * - `word → replacement` — has a preferred replacement
 *
 * Lines starting with # are comments. Empty lines are skipped.
 *
 * @param filePath - Path to the flagged words text file.
 * @returns An array of flagged word entries.
 */
function loadFlaggedWords(filePath: string): FlaggedWordEntry[] {
  const content = readFileSync(filePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line) => {
      if (line.includes("→")) {
        const [avoid, useInstead] = line.split("→").map((s) => s.trim());
        return { word: avoid.toLowerCase(), suggestion: useInstead };
      }
      return { word: line.toLowerCase() };
    });
}

// ============================================================================
// Spell checking
//
// Uses cspell-lib to check spelling. The forbidden words list is passed
// to cspell as flagWords so they are also caught by the spell checker.
// Results are split: cspell flagged words go to forbiddenWords, unknown
// words go to spelling.
// ============================================================================

/**
 * Runs cspell spell checking on the document text.
 *
 * @param text - The full document text.
 * @param filePath - The path to the file (used by cspell for context).
 * @param forbiddenWords - Words to pass as cspell flagWords.
 * @returns An object with separate arrays for spelling issues and
 *          cspell-detected forbidden word issues.
 */
async function checkSpelling(
  text: string,
  filePath: string,
  forbiddenWords: string[]
): Promise<{ spelling: SpellingIssue[]; flagged: ForbiddenWordIssue[] }> {
  const defaultSettings = getDefaultSettings();
  const settings = {
    ...defaultSettings,
    language: "en",
    flagWords: forbiddenWords,
  };

  const doc = {
    uri: `file://${resolve(filePath)}`,
    text,
    languageId: "markdown",
  };

  const result = await spellCheckDocument(doc, {}, settings);

  const spelling: SpellingIssue[] = [];
  const flagged: ForbiddenWordIssue[] = [];
  const lines = text.split("\n");

  for (const issue of result.issues) {
    const lineNum = offsetToLine(text, issue.offset);

    if (issue.isFlagged) {
      flagged.push({
        word: issue.text.toLowerCase(),
        line: lineNum,
        lineText: lines[lineNum - 1] ?? "",
      });
    } else {
      spelling.push({
        word: issue.text,
        line: lineNum,
        offset: issue.offset,
      });
    }
  }

  return { spelling, flagged };
}

/**
 * Converts a character offset to a 1-indexed line number.
 *
 * @param text - The full document text.
 * @param offset - The character offset from the start.
 * @returns The 1-indexed line number.
 */
function offsetToLine(text: string, offset: number): number {
  const before = text.slice(0, offset);
  return before.split("\n").length;
}

// ============================================================================
// Heading checks
//
// Parses the markdown AST to extract headings, then checks for:
// - Skipped heading levels (e.g. H2 → H4 without H3)
// - Multiple H1 headings in the same document
// - Headings not in sentence case
// ============================================================================

/** A heading extracted from the markdown AST. */
interface ParsedHeading {
  /** The heading depth (1–6). */
  depth: number;
  /** The heading text content. */
  text: string;
  /** The line number in the source file (1-indexed). */
  line: number;
}

/**
 * Extracts all headings from a markdown string using the remark AST.
 *
 * @param markdown - The raw markdown string.
 * @returns An array of parsed headings with depth, text, and line number.
 */
function extractHeadings(markdown: string): ParsedHeading[] {
  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .parse(markdown);

  const headings: ParsedHeading[] = [];

  for (const node of tree.children as any[]) {
    if (node.type === "heading") {
      const text = extractNodeText(node);
      headings.push({
        depth: node.depth,
        text,
        line: node.position?.start?.line ?? 0,
      });
    }
  }

  return headings;
}

/**
 * Recursively extracts plain text from a remark AST node.
 *
 * @param node - A remark AST node.
 * @returns The concatenated text content.
 */
function extractNodeText(node: any): string {
  if (node.type === "text") return node.value;
  if (node.type === "inlineCode") return node.value;
  if (node.children) return node.children.map(extractNodeText).join("");
  return "";
}

/**
 * Checks whether a heading is in sentence case. Sentence case means only
 * the first letter of the heading is capitalised, with the exception of:
 * - Words after a colon or dash
 * - Proper nouns (approximated: words that are ALL CAPS or PascalCase are skipped)
 * - Backtick-wrapped code
 *
 * @param text - The heading text to check.
 * @returns `true` if the heading appears to be in sentence case.
 */
function isSentenceCase(text: string): boolean {
  // Remove backtick-wrapped segments — they don't count
  const cleaned = text.replace(/`[^`]+`/g, "PLACEHOLDER");

  // Split into words
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0);
  if (words.length === 0) return true;

  for (let i = 1; i < words.length; i++) {
    const word = words[i];

    // Skip placeholder (was code), ALL CAPS (likely acronym), or PascalCase
    if (word === "PLACEHOLDER") continue;
    if (word === word.toUpperCase() && word.length > 1) continue;
    if (/^[A-Z][a-z]+[A-Z]/.test(word)) continue;

    // Skip words after colon or dash (they can be capitalised)
    const prevWord = words[i - 1];
    if (prevWord.endsWith(":") || prevWord.endsWith("—") || prevWord === "—")
      continue;

    // Check if the word starts with an uppercase letter when it should not
    if (/^[A-Z]/.test(word) && /^[A-Z][a-z]/.test(word)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks all headings for hierarchy issues, multiple H1s, and sentence
 * case violations.
 *
 * @param headings - The parsed headings from the document.
 * @returns An array of heading issues.
 */
function checkHeadings(headings: ParsedHeading[]): HeadingIssue[] {
  const issues: HeadingIssue[] = [];

  // Check for multiple H1s
  const h1s = headings.filter((h) => h.depth === 1);
  if (h1s.length > 1) {
    for (const h1 of h1s.slice(1)) {
      issues.push({
        type: "multiple-h1",
        line: h1.line,
        text: h1.text,
        message: `Multiple H1 headings found. "${h1.text}" is the ${h1s.indexOf(h1) + 1}th H1 — a document should have only one.`,
      });
    }
  }

  // Check for skipped levels
  let lastDepth = 0;
  for (const heading of headings) {
    if (lastDepth > 0 && heading.depth > lastDepth + 1) {
      issues.push({
        type: "skipped-level",
        line: heading.line,
        text: heading.text,
        message: `Heading level skipped: H${lastDepth} → H${heading.depth}. Expected H${lastDepth + 1}.`,
      });
    }
    lastDepth = heading.depth;
  }

  // Check for sentence case
  for (const heading of headings) {
    if (!isSentenceCase(heading.text)) {
      issues.push({
        type: "not-sentence-case",
        line: heading.line,
        text: heading.text,
        message: `Heading is not in sentence case: "${heading.text}".`,
      });
    }
  }

  return issues;
}

// ============================================================================
// Formatting checks
//
// Custom checks for punctuation and formatting issues that cspell does not
// cover. Currently checks for em-dashes (—) which should not be used.
// ============================================================================

/**
 * Scans the document for formatting issues.
 *
 * @param text - The full document text.
 * @returns An array of formatting issues.
 */
function checkFormatting(text: string): FormattingIssue[] {
  const issues: FormattingIssue[] = [];
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("—")) {
      issues.push({
        type: "em-dash",
        line: i + 1,
        lineText: lines[i],
        message: "Em-dash (—) found. Use an alternative phrasing or punctuation.",
      });
    }
  }

  return issues;
}

// ============================================================================
// Main
// ============================================================================

/**
 * Analyses a markdown file for copy editing issues: spelling errors,
 * forbidden words, and heading problems (hierarchy and sentence case).
 *
 * @param filePath - Absolute or relative path to a markdown file.
 * @returns An object containing `spelling`, `forbiddenWords`, `headings`
 *          arrays and a `summary` with counts.
 */
export async function analyseFile(filePath: string): Promise<Output> {
  const resolvedPath = resolve(filePath);
  const text = readFileSync(resolvedPath, "utf-8");

  // Load flagged words (forbidden + substitutions from a single file).
  // Multi-word phrases (e.g. "in order to", "end user") are included in
  // flagged-words.txt but skipped here — cspell operates on single words.
  // The LLM qualitative pass handles multi-word phrase detection.
  const flaggedEntries = loadFlaggedWords(FLAGGED_WORDS_PATH);
  const singleWordEntries = flaggedEntries.filter(
    (e) => !e.word.includes(" ")
  );
  const allFlagWords = singleWordEntries.map((e) => e.word);

  // Build a lookup map from flagged word to its suggestion (if any)
  const suggestionMap = new Map<string, string>();
  for (const entry of singleWordEntries) {
    if (entry.suggestion) {
      suggestionMap.set(entry.word, entry.suggestion);
    }
  }

  // Run spell checking (includes forbidden word detection via cspell flagWords)
  const { spelling, flagged } = await checkSpelling(
    text,
    resolvedPath,
    allFlagWords
  );

  // Attach suggestions where available
  const allForbidden = deduplicateForbidden(flagged).map((issue) => ({
    ...issue,
    suggestion: suggestionMap.get(issue.word),
  }));

  // Check headings
  const headings = extractHeadings(text);
  const headingIssues = checkHeadings(headings);

  // Check formatting (em-dashes, etc.)
  const formattingIssues = checkFormatting(text);

  // Build summary
  const summary: Summary = {
    spelling: spelling.length,
    forbiddenWords: allForbidden.length,
    headings: headingIssues.length,
    formatting: formattingIssues.length,
    total:
      spelling.length +
      allForbidden.length +
      headingIssues.length +
      formattingIssues.length,
  };

  return {
    spelling,
    forbiddenWords: allForbidden,
    headings: headingIssues,
    formatting: formattingIssues,
    summary,
  };
}

/**
 * Deduplicates forbidden word issues by line and word, keeping the first
 * occurrence.
 *
 * @param issues - The array of forbidden word issues to deduplicate.
 * @returns A deduplicated array.
 */
function deduplicateForbidden(
  issues: ForbiddenWordIssue[]
): ForbiddenWordIssue[] {
  const seen = new Set<string>();
  return issues.filter((issue) => {
    const key = `${issue.line}:${issue.word}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// CLI entry point — only runs when executed directly, not when imported
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1].endsWith("copy-editing.ts") ||
    process.argv[1].endsWith("copy-editing.js"));

if (isDirectExecution) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: copy-editing <file.md>");
    process.exit(1);
  }

  analyseFile(resolve(filePath)).then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });
}
