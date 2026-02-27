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
export declare function analyseFile(filePath: string): Output;
export {};
