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
/**
 * Analyses a markdown file for copy editing issues: spelling errors,
 * forbidden words, and heading problems (hierarchy and sentence case).
 *
 * @param filePath - Absolute or relative path to a markdown file.
 * @returns An object containing `spelling`, `forbiddenWords`, `headings`
 *          arrays and a `summary` with counts.
 */
export declare function analyseFile(filePath: string): Promise<Output>;
export {};
