import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { analyseFile } from "../src/skills/readability-evaluation/readability-score.ts";

const fixture = (name: string) => resolve(import.meta.dirname, "fixtures", name);

describe("analyseFile", () => {
  describe("overall scores", () => {
    it("returns overall scores for a document", () => {
      const result = analyseFile(fixture("sample-doc.md"));

      expect(result.overall).toBeDefined();
      expect(result.overall.wordCount).toBeGreaterThan(0);
      expect(result.overall.sentenceCount).toBeGreaterThan(0);
      expect(result.overall.fleschKincaidGrade).toBeGreaterThan(0);
      expect(result.overall.fleschReadingEase).toBeGreaterThan(0);
      expect(result.overall.avgSentenceLength).toBeGreaterThan(0);
      expect(result.overall.avgSyllablesPerWord).toBeGreaterThan(0);
    });
  });

  describe("section breakdown", () => {
    it("splits scores by H2 heading", () => {
      const result = analyseFile(fixture("sample-doc.md"));

      expect(result.sections).toBeDefined();
      expect(result.sections["Description"]).toBeDefined();
      expect(result.sections["Usage"]).toBeDefined();
      expect(result.sections["Anatomy"]).toBeDefined();
      expect(result.sections["Properties"]).toBeDefined();
    });

    it("scores each section independently", () => {
      const result = analyseFile(fixture("sample-doc.md"));

      const description = result.sections["Description"];
      const usage = result.sections["Usage"];

      expect(description.wordCount).toBeGreaterThan(0);
      expect(usage.wordCount).toBeGreaterThan(0);
      expect(description.wordCount).not.toBe(usage.wordCount);
    });
  });

  describe("code block exclusion", () => {
    it("excludes fenced code blocks from word count", () => {
      const result = analyseFile(fixture("code-blocks.md"));

      // The code block contains words like "reallyLongVariableName" and
      // "someFunction" — these should not appear in the word count.
      // The document has very little prose, so word count should be low.
      expect(result.overall.wordCount).toBeLessThan(60);
    });

    it("excludes tables from analysis", () => {
      const result = analyseFile(fixture("code-blocks.md"));

      // Table content should not be in the prose analysis.
      // If tables were included, word count would be higher.
      const allText = Object.values(result.sections)
        .map((s) => s.wordCount)
        .reduce((a, b) => a + b, 0);
      expect(allText).toBeLessThan(60);
    });
  });

  describe("frontmatter exclusion", () => {
    it("excludes YAML frontmatter from analysis", () => {
      const result = analyseFile(fixture("sample-doc.md"));

      // Frontmatter words like "button", "component" in the YAML block
      // should not inflate the count beyond what the prose contains.
      // The overall word count should match only the prose sections.
      expect(result.overall.wordCount).toBeGreaterThan(50);
      expect(result.overall.wordCount).toBeLessThan(200);
    });
  });

  describe("long sentence flags", () => {
    it("flags sentences over 25 words", () => {
      const result = analyseFile(fixture("long-sentences.md"));

      const longSentenceFlags = result.flags.filter(
        (f) => f.type === "long-sentence"
      );

      expect(longSentenceFlags.length).toBeGreaterThanOrEqual(2);

      for (const flag of longSentenceFlags) {
        expect(flag.value).toBeGreaterThan(25);
        expect(flag.section).toBeDefined();
        expect(flag.line).toBeGreaterThan(0);
      }
    });

    it("does not flag short sentences", () => {
      const result = analyseFile(fixture("long-sentences.md"));

      const longSentenceFlags = result.flags.filter(
        (f) => f.type === "long-sentence"
      );

      // The "Short section" has only short sentences — none should be flagged.
      const shortSectionFlags = longSentenceFlags.filter(
        (f) => f.section === "Short section"
      );
      expect(shortSectionFlags.length).toBe(0);
    });

    it("includes the sentence text in the flag", () => {
      const result = analyseFile(fixture("long-sentences.md"));

      const longSentenceFlags = result.flags.filter(
        (f) => f.type === "long-sentence"
      );

      for (const flag of longSentenceFlags) {
        expect(flag.text.length).toBeGreaterThan(0);
      }
    });
  });

  describe("output structure", () => {
    it("returns all three top-level keys", () => {
      const result = analyseFile(fixture("sample-doc.md"));

      expect(result).toHaveProperty("overall");
      expect(result).toHaveProperty("sections");
      expect(result).toHaveProperty("flags");
    });

    it("flags is an array", () => {
      const result = analyseFile(fixture("sample-doc.md"));
      expect(Array.isArray(result.flags)).toBe(true);
    });

    it("sections is an object keyed by heading", () => {
      const result = analyseFile(fixture("sample-doc.md"));
      expect(typeof result.sections).toBe("object");

      for (const key of Object.keys(result.sections)) {
        expect(typeof key).toBe("string");
      }
    });
  });
});
