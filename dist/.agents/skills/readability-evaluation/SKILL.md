---
name: readability-evaluation
description: Scores and evaluates documentation readability using Flesch-Kincaid metrics and qualitative analysis. Use when reviewing docs for sentence length, passive voice, jargon, and reading level.
---

# Readability evaluation

Hard technique for scoring and evaluating documentation readability.

## Two-pass approach

1. **Deterministic pass**: Run the `readability-score` script to get objective metrics
2. **Qualitative pass**: Apply LLM judgment on top for context-dependent factors

The deterministic score provides the baseline. The LLM adds nuance that formulas cannot capture.

## Running the script

Run `readability-score.js` from the same directory as this skill file. Pass the path to a markdown file as the only argument.

```bash
node <skill-directory>/readability-score.js <file.md>
```

The script:

- Parses the markdown file, stripping frontmatter and code blocks
- Splits the document into sections by H2 headings
- Scores each section independently using Flesch-Kincaid metrics
- Flags long sentences (over 25 words) and long paragraphs (over 5 sentences)
- Outputs JSON to stdout

### Output structure

The script outputs a JSON object with three keys:

```json
{
  "overall": {
    "fleschKincaidGrade": 8,
    "fleschReadingEase": 59.19,
    "wordCount": 157,
    "sentenceCount": 13,
    "avgSentenceLength": 12.1,
    "avgSyllablesPerWord": 1.6
  },
  "sections": {
    "Description": {
      "fleschKincaidGrade": 7,
      "fleschReadingEase": 61.83,
      "wordCount": 19,
      "sentenceCount": 2,
      "avgSentenceLength": 9.5,
      "avgSyllablesPerWord": 1.6
    }
  },
  "flags": [
    {
      "type": "long-sentence",
      "section": "Problems",
      "line": 9,
      "text": "The navigation component which is used across...",
      "value": 47
    },
    {
      "type": "long-paragraph",
      "section": "Overview",
      "line": 5,
      "text": "First sentence of the paragraph...",
      "value": 7
    }
  ]
}
```

**`overall`** — document-level scores. Use `fleschKincaidGrade` and `fleschReadingEase` to assess the whole document against the target thresholds.

**`sections`** — per-section breakdown keyed by H2 heading text. Sections with no prose (e.g. only code blocks) are omitted. Compare each section against the thresholds to find problem areas.

**`flags`** — specific issues the script detected. Each flag has a `type` (`long-sentence` or `long-paragraph`), the `section` it belongs to, the `line` number in the source file (1-indexed), the `text` of the sentence or paragraph start, and the `value` (word count for sentences, sentence count for paragraphs).

### Interpreting the scores

Use the script output as the starting point for the qualitative pass. Do not report raw numbers alone. Contextualise them:

- A section with grade level 12 in an API reference may be acceptable
- A section with grade level 12 in a getting started guide is a problem
- Flags are not automatic failures. A 26-word sentence that reads clearly is fine. A 26-word sentence with nested clauses is not.

## Target thresholds

<thresholds>

### By doc type

| Doc type | FK grade level | Reading ease |
| :------- | :------------- | :----------- |
| Component docs | 8–10 | 60–70 |
| Pattern docs | 8–10 | 60–70 |
| Foundation docs | 8–10 | 60–70 |
| Content guidelines | 7–9 | 65–75 |
| Accessibility standards | 9–11 | 55–65 |
| API/Props sections | 10–12 | 50–65 |

These are targets, not hard rules. Context matters: an accessibility standard discussing ARIA specifications will naturally score higher.

</thresholds>

## Qualitative checks

The following checks are performed by the LLM during the qualitative pass. The script does not cover these.

### Passive voice

<passive_voice>

Common passive patterns to flag:

- "is/are/was/were [verb]ed by"
- "has/have been [verb]ed"
- "should be [verb]ed"
- "can be [verb]ed"

Not all passive voice is bad. It is sometimes appropriate, especially in accessibility requirements. Flag it but note when it might be intentional.

</passive_voice>

### Jargon

<jargon>

Flag terms that are:

- Not defined in the document itself
- Not in a linked glossary
- Not standard web development terms that the stated audience would know

Common DS jargon to watch for:

- Token, primitive, semantic (if not defined)
- Affordance, heuristic, mental model
- Implementation detail, abstraction layer
- Framework-specific terms (slots, props, hooks) without context

</jargon>

### Acronyms

<acronyms>

- Expand on first use: "Web Content Accessibility Guidelines (WCAG)"
- After first expansion, the acronym alone is fine
- Well-known exceptions (HTML, CSS, URL, API) do not need expansion in developer docs
- When in doubt, expand it

</acronyms>

## Output format

<output_format>

```
━━━ Readability Review ━━━

Deterministic Scores:
  Flesch-Kincaid Grade Level: {score} (target: {target range})
  Flesch Reading Ease: {score} (target: {target range})
  Average sentence length: {words} words

Per-Section Breakdown:
  {Section Name}: Grade {score} — {assessment}
  {Section Name}: Grade {score} — {assessment}

Findings:

[severity] Section: {name} (line ~{number})
  Issue: {description}
  Current: "{the text}"
  Suggested: "{improvement}"

Summary:
  Overall grade level: {score}
  Sections flagged: {count}
  Long sentences: {count}
  Jargon instances: {count}
  Unexpanded acronyms: {count}
```

</output_format>
