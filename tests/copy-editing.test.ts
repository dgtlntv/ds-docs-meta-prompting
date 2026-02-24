import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { analyseFile } from "../src/skills/copy-editing-evaluation/copy-editing.ts";

const fixture = (name: string) =>
  resolve(import.meta.dirname, "fixtures", name);

describe("analyseFile", () => {
  describe("heading checks", () => {
    it("detects skipped heading levels", async () => {
      const result = await analyseFile(fixture("heading-issues.md"));

      const skipped = result.headings.filter(
        (h) => h.type === "skipped-level"
      );
      expect(skipped.length).toBeGreaterThanOrEqual(1);
      expect(skipped[0].message).toContain("H2 → H4");
    });

    it("detects multiple H1 headings", async () => {
      const result = await analyseFile(fixture("heading-issues.md"));

      const multipleH1 = result.headings.filter(
        (h) => h.type === "multiple-h1"
      );
      expect(multipleH1.length).toBe(1);
      expect(multipleH1[0].text).toBe("Second H1");
    });

    it("detects headings not in sentence case", async () => {
      const result = await analyseFile(fixture("heading-issues.md"));

      const notSentenceCase = result.headings.filter(
        (h) => h.type === "not-sentence-case"
      );
      expect(notSentenceCase.length).toBeGreaterThanOrEqual(1);

      const texts = notSentenceCase.map((h) => h.text);
      expect(texts).toContain("This Is Title Case");
    });

    it("does not flag sentence case headings", async () => {
      const result = await analyseFile(fixture("heading-issues.md"));

      const notSentenceCase = result.headings.filter(
        (h) => h.type === "not-sentence-case"
      );
      const texts = notSentenceCase.map((h) => h.text);
      expect(texts).not.toContain("This is sentence case");
    });
  });

  describe("forbidden word detection", () => {
    it("detects forbidden words", async () => {
      const result = await analyseFile(fixture("forbidden-words.md"));

      const words = result.forbiddenWords.map((f) => f.word);
      expect(words).toContain("simply");
      expect(words).toContain("just");
    });

    it("detects words to avoid from the style guide", async () => {
      const result = await analyseFile(fixture("forbidden-words.md"));

      const words = result.forbiddenWords.map((f) => f.word);
      expect(words).toContain("please");
      expect(words).toContain("obviously");
    });

    it("includes line numbers for forbidden words", async () => {
      const result = await analyseFile(fixture("forbidden-words.md"));

      for (const issue of result.forbiddenWords) {
        expect(issue.line).toBeGreaterThan(0);
      }
    });

    it("does not flag clean sections", async () => {
      const result = await analyseFile(fixture("forbidden-words.md"));

      // The "Clean section" starts at line 11 — no forbidden words should
      // be flagged on lines 11+
      const cleanSectionLine = 11;
      const cleanIssues = result.forbiddenWords.filter(
        (f) => f.line >= cleanSectionLine
      );
      expect(cleanIssues.length).toBe(0);
    });
  });

  describe("spelling checks", () => {
    it("detects misspelled words", async () => {
      const result = await analyseFile(fixture("spelling-errors.md"));

      const words = result.spelling.map((s) => s.word);
      expect(words).toContain("componnet");
      expect(words).toContain("responsve");
    });

    it("includes line numbers for spelling issues", async () => {
      const result = await analyseFile(fixture("spelling-errors.md"));

      for (const issue of result.spelling) {
        expect(issue.line).toBeGreaterThan(0);
      }
    });
  });

  describe("formatting checks", () => {
    it("detects em-dashes", async () => {
      const result = await analyseFile(fixture("em-dashes.md"));

      expect(result.formatting.length).toBe(2);
      expect(result.formatting[0].type).toBe("em-dash");
      expect(result.formatting[0].line).toBe(5);
      expect(result.formatting[1].line).toBe(13);
    });

    it("does not flag lines without em-dashes", async () => {
      const result = await analyseFile(fixture("em-dashes.md"));

      const lines = result.formatting.map((f) => f.line);
      expect(lines).not.toContain(9);
    });
  });

  describe("output structure", () => {
    it("returns all five top-level keys", async () => {
      const result = await analyseFile(fixture("heading-issues.md"));

      expect(result).toHaveProperty("spelling");
      expect(result).toHaveProperty("forbiddenWords");
      expect(result).toHaveProperty("headings");
      expect(result).toHaveProperty("formatting");
      expect(result).toHaveProperty("summary");
    });

    it("summary counts match issue arrays", async () => {
      const result = await analyseFile(fixture("forbidden-words.md"));

      expect(result.summary.spelling).toBe(result.spelling.length);
      expect(result.summary.forbiddenWords).toBe(
        result.forbiddenWords.length
      );
      expect(result.summary.headings).toBe(result.headings.length);
      expect(result.summary.formatting).toBe(result.formatting.length);
      expect(result.summary.total).toBe(
        result.spelling.length +
          result.forbiddenWords.length +
          result.headings.length +
          result.formatting.length
      );
    });
  });
});
