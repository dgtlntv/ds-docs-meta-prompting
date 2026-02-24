/**
 * Readability score script for the readability-evaluation skill.
 *
 * Analyses a markdown document and outputs JSON with three keys:
 * - `overall` — document-level readability scores
 * - `sections` — per-section scores, keyed by H2 heading
 * - `flags` — specific issues (long sentences, long paragraphs) with line numbers
 *
 * The script strips non-prose content (code blocks, frontmatter, tables, HTML)
 * before scoring, so only readable text is measured.
 *
 * @example
 * ```bash
 * node readability-score.js <file.md>
 * ```
 *
 * @module readability-score
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
// @ts-expect-error — no type declarations
import rs from "text-readability";

// ============================================================================
// Types
// ============================================================================

/** Readability scores for a section or the full document. */
interface SectionScores {
  /** Flesch-Kincaid grade level. Represents the US school grade needed to understand the text. Lower is more readable. */
  fleschKincaidGrade: number;
  /** Flesch reading ease score. Scale 0–100, higher is more readable. 60–70 is standard. */
  fleschReadingEase: number;
  /** Total number of words in the analysed text. */
  wordCount: number;
  /** Total number of sentences in the analysed text. */
  sentenceCount: number;
  /** Average number of words per sentence, rounded to one decimal place. */
  avgSentenceLength: number;
  /** Average number of syllables per word, rounded to one decimal place. */
  avgSyllablesPerWord: number;
}

/** A flagged issue found during analysis. */
interface Flag {
  /** The type of issue detected. */
  type: "long-sentence" | "long-paragraph";
  /** The H2 section heading this flag belongs to. */
  section: string;
  /** The line number in the source markdown file where the issue starts. */
  line: number;
  /** The offending text. Truncated to 100 characters for long paragraphs. */
  text: string;
  /** Word count for long-sentence flags. Sentence count for long-paragraph flags. */
  value: number;
}

/** The complete output of a readability analysis. */
interface Output {
  /** Document-level readability scores across all prose content. */
  overall: SectionScores;
  /** Per-section readability scores, keyed by H2 heading text. */
  sections: Record<string, SectionScores>;
  /** Array of flagged issues with line numbers and offending text. */
  flags: Flag[];
}

// ============================================================================
// Markdown parsing
//
// Parses a markdown string into sections split by H2 headings. Each section
// contains text fragments extracted from prose nodes (paragraphs and list
// items). Non-prose nodes — code blocks, frontmatter, tables, HTML, and
// thematic breaks — are skipped entirely.
// ============================================================================

/** A fragment of prose text with its source line number. */
interface TextFragment {
  /** The extracted plain text content. */
  text: string;
  /** The line number in the source markdown file where this fragment starts. */
  line: number;
}

/** A document section: an H2 heading and the prose fragments beneath it. */
interface Section {
  /** The text content of the H2 heading, or "(intro)" for content before the first H2. */
  heading: string;
  /** The prose fragments that fall under this heading. */
  fragments: TextFragment[];
}

/**
 * Parses a markdown string and returns an array of sections, each containing
 * the prose fragments that fall under its H2 heading. Content before the
 * first H2 is grouped under "(intro)".
 *
 * Non-prose nodes are excluded from the output:
 * - YAML frontmatter
 * - Fenced and indented code blocks
 * - HTML blocks
 * - Tables
 * - Thematic breaks
 * - Definition nodes
 *
 * @param markdown - The raw markdown string to parse.
 * @returns An array of sections, each with a heading and prose fragments.
 *          Sections with no prose fragments are filtered out.
 */
function extractSections(markdown: string): Section[] {
  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .parse(markdown);

  const sections: Section[] = [];
  let currentHeading = "(intro)";

  /**
   * Registers a new section if one with this heading does not already exist
   * and sets it as the current heading for subsequent fragments.
   *
   * @param heading - The H2 heading text.
   */
  function startSection(heading: string): void {
    currentHeading = heading;
    if (!sections.find((s) => s.heading === heading)) {
      sections.push({ heading, fragments: [] });
    }
  }

  /**
   * Returns the section matching the current heading, creating it if needed.
   *
   * @returns The current section object.
   */
  function currentSection(): Section {
    let section = sections.find((s) => s.heading === currentHeading);
    if (!section) {
      section = { heading: currentHeading, fragments: [] };
      sections.push(section);
    }
    return section;
  }

  /**
   * Recursively extracts plain text from an AST node. Includes inline code
   * values and link text. Skips non-text leaf nodes like images.
   *
   * @param node - A remark AST node.
   * @returns The concatenated plain text content of the node and its children.
   */
  function extractText(node: any): string {
    if (node.type === "text") return node.value;
    if (node.type === "inlineCode") return node.value;
    if (node.children) {
      return node.children.map(extractText).join("");
    }
    return "";
  }

  for (const node of tree.children as any[]) {
    // Skip non-prose nodes entirely
    if (
      node.type === "yaml" ||
      node.type === "code" ||
      node.type === "html" ||
      node.type === "table" ||
      node.type === "definition" ||
      node.type === "thematicBreak"
    ) {
      continue;
    }

    // H2 headings start a new section
    if (node.type === "heading" && node.depth === 2) {
      const headingText = extractText(node);
      startSection(headingText);
      continue;
    }

    // Paragraphs — extract text with line number
    if (node.type === "paragraph") {
      const text = extractText(node).trim();
      if (text) {
        currentSection().fragments.push({
          text,
          line: node.position?.start?.line ?? 0,
        });
      }
      continue;
    }

    // Lists — extract text from each list item's paragraphs
    if (node.type === "list") {
      for (const item of node.children ?? []) {
        if (item.type === "listItem") {
          for (const child of item.children ?? []) {
            if (child.type === "paragraph") {
              const text = extractText(child).trim();
              if (text) {
                currentSection().fragments.push({
                  text,
                  line: child.position?.start?.line ?? 0,
                });
              }
            }
          }
        }
      }
      continue;
    }
  }

  return sections.filter((s) => s.fragments.length > 0);
}

// ============================================================================
// Scoring
//
// Feeds extracted prose text into text-readability to compute Flesch-Kincaid
// grade level, Flesch reading ease, and supporting metrics.
// ============================================================================

/**
 * Computes readability scores for a block of plain text.
 * Returns zeroed scores if the text has no words or sentences.
 *
 * @param text - Plain text to score (no markdown).
 * @returns Readability scores including grade level, reading ease,
 *          word count, sentence count, and averages.
 */
function scoreText(text: string): SectionScores {
  const wordCount = rs.lexiconCount(text);
  const sentenceCount = rs.sentenceCount(text);
  const syllableCount = rs.syllableCount(text);

  return {
    fleschKincaidGrade: wordCount > 0 ? rs.fleschKincaidGrade(text) : 0,
    fleschReadingEase: wordCount > 0 ? rs.fleschReadingEase(text) : 0,
    wordCount,
    sentenceCount,
    avgSentenceLength:
      sentenceCount > 0
        ? Math.round((wordCount / sentenceCount) * 10) / 10
        : 0,
    avgSyllablesPerWord:
      wordCount > 0
        ? Math.round((syllableCount / wordCount) * 10) / 10
        : 0,
  };
}

// ============================================================================
// Flagging
//
// Scans prose fragments for issues that should be surfaced in the output:
// sentences over 25 words and paragraphs over 5 sentences. Each flag
// includes the section name, source line number, the offending text, and
// the measured value.
// ============================================================================

/** Sentences with more words than this are flagged. */
const LONG_SENTENCE_THRESHOLD = 25;

/** Paragraphs (fragments) with more sentences than this are flagged. */
const LONG_PARAGRAPH_THRESHOLD = 5;

/**
 * Splits a block of text into sentences on sentence-ending punctuation
 * followed by whitespace. This is a simple heuristic — it does not handle
 * abbreviations or other edge cases.
 *
 * @param text - Plain text to split.
 * @returns An array of non-empty sentence strings.
 */
function splitSentences(text: string): string[] {
  return text
    .replace(/([.!?])\s+/g, "$1\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Counts the number of whitespace-delimited words in a string.
 *
 * @param sentence - The text to count words in.
 * @returns The number of words.
 */
function countWords(sentence: string): number {
  return sentence.split(/\s+/).filter((w) => w.length > 0).length;
}

/**
 * Scans all sections for long sentences and long paragraphs.
 *
 * A sentence is flagged if it exceeds {@link LONG_SENTENCE_THRESHOLD} words.
 * A paragraph (text fragment) is flagged if it exceeds
 * {@link LONG_PARAGRAPH_THRESHOLD} sentences.
 *
 * @param sections - The parsed sections to scan.
 * @returns An array of flags, each tied to a specific section and line number.
 */
function detectFlags(sections: Section[]): Flag[] {
  const flags: Flag[] = [];

  for (const section of sections) {
    // Flag sentences over the word count threshold
    for (const fragment of section.fragments) {
      const sentences = splitSentences(fragment.text);
      for (const sentence of sentences) {
        const wordCount = countWords(sentence);
        if (wordCount > LONG_SENTENCE_THRESHOLD) {
          flags.push({
            type: "long-sentence",
            section: section.heading,
            line: fragment.line,
            text: sentence,
            value: wordCount,
          });
        }
      }
    }

    // Flag paragraphs (fragments) over the sentence count threshold
    for (const fragment of section.fragments) {
      const sentenceCount = splitSentences(fragment.text).length;
      if (sentenceCount > LONG_PARAGRAPH_THRESHOLD) {
        flags.push({
          type: "long-paragraph",
          section: section.heading,
          line: fragment.line,
          text:
            fragment.text.length > 100
              ? fragment.text.slice(0, 100) + "..."
              : fragment.text,
          value: sentenceCount,
        });
      }
    }
  }

  return flags;
}

// ============================================================================
// Main
// ============================================================================

/**
 * Analyses a markdown file and returns readability scores, per-section
 * breakdowns, and flagged issues.
 *
 * The file is parsed into sections split by H2 headings. Non-prose content
 * (code blocks, frontmatter, tables, HTML) is excluded before scoring.
 *
 * @param filePath - Absolute or relative path to a markdown file.
 * @returns An object containing `overall` scores, per-`sections` scores,
 *          and an array of `flags` for issues like long sentences.
 */
export function analyseFile(filePath: string): Output {
  const markdown = readFileSync(filePath, "utf-8");
  const sections = extractSections(markdown);

  // Score each section independently
  const sectionScores: Record<string, SectionScores> = {};
  for (const section of sections) {
    const text = section.fragments.map((f) => f.text).join(" ");
    sectionScores[section.heading] = scoreText(text);
  }

  // Score the full document
  const allText = sections
    .flatMap((s) => s.fragments.map((f) => f.text))
    .join(" ");
  const overall = scoreText(allText);

  // Detect flaggable issues
  const flags = detectFlags(sections);

  return { overall, sections: sectionScores, flags };
}

// CLI entry point — only runs when executed directly, not when imported
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1].endsWith("readability-score.ts") ||
    process.argv[1].endsWith("readability-score.js"));

if (isDirectExecution) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: readability-score <file.md>");
    process.exit(1);
  }

  const result = analyseFile(resolve(filePath));
  console.log(JSON.stringify(result, null, 2));
}
