---
name: readability-evaluation
description: Scores and evaluates documentation readability using Flesch-Kincaid metrics and qualitative analysis. Use when reviewing docs for sentence length, passive voice, jargon, and reading level.
---

# Readability evaluation

Hard technique for scoring and evaluating documentation readability.

## Two-pass approach

1. **Deterministic pass**: Run `.claude/scripts/readability-score.py` to get objective metrics
2. **Qualitative pass**: Apply LLM judgment on top for context-dependent factors

The deterministic score provides the baseline. The LLM adds nuance that formulas cannot capture.

## Deterministic metrics

<metrics>

### Flesch-Kincaid grade level

- Formula: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
- Interpretation: US school grade level needed to understand the text
- Lower is more readable

### Flesch reading ease

- Formula: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
- Scale: 0–100, higher is more readable
- 60–70: standard / 70–80: fairly easy / 80–90: easy

### How to interpret script output

The script outputs JSON with:

- `overall`: document-level scores
- `sections`: per-section breakdown (keyed by heading)
- `flags`: specific issues detected (long sentences, long paragraphs)

</metrics>

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

## Sentence length rules

<sentence_length>

- Flag: sentences over 25 words
- Ideal: 15–20 words per sentence
- Exception: code examples, API signatures, and lists are excluded
- Check: average sentence length per section, not just overall

</sentence_length>

## Paragraph length rules

<paragraph_length>

- Flag: paragraphs with more than 5 sentences
- Ideal: 2–4 sentences per paragraph
- Exception: step-by-step procedures may have longer structured paragraphs

</paragraph_length>

## Passive voice detection

<passive_voice>

Common passive patterns to flag:

- "is/are/was/were [verb]ed by"
- "has/have been [verb]ed"
- "should be [verb]ed"
- "can be [verb]ed"

Not all passive voice is bad — sometimes it is appropriate (especially in accessibility requirements). Flag it but note when it might be intentional.

</passive_voice>

## Jargon detection

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

## Acronym rules

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
  Passive voice: ~{percentage}%

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
