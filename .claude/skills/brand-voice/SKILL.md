---
name: brand-voice
description: Evaluates documentation against the team's brand voice guidelines. Use when reviewing docs for tone, terminology, sentence structure, and phrasing consistency.
---

# Brand Voice Evaluation

Hard technique for evaluating documentation against a team's brand voice guidelines.

## The Style Guide

dockit ships with a built-in style guide at `.claude/dockit/style-guide.md`. This is the source of truth for all voice evaluation — always read it before evaluating any content.

The style guide covers:

1. **Tone** — clear, direct, confident but not arrogant
2. **Terminology preferences** — preferred terms and forbidden words
3. **Sentence structure rules** — active voice, sentence length, parallel structure
4. **Formatting conventions** — heading case, list punctuation, code examples
5. **Punctuation** — serial comma, em dashes, quotation marks
6. **Accessibility in writing** — inclusive language practices

Read the entire style guide before evaluating any content. Build a mental checklist from it.

## What to Check

### Tone Alignment

- Does the document's tone match the descriptors in the style guide?
- Is the tone consistent throughout, or does it shift between sections?
- Are there sections that feel noticeably different from the rest?

### Terminology Consistency

- Does the document use the preferred terms listed in the style guide?
- Are there instances of forbidden words or phrases?
- Pattern: if the style guide says "use X not Y", search the entire document for every instance of Y

### Sentence Structure

- If the style guide prefers active voice, flag passive constructions
- If the style guide specifies sentence length preferences, flag violations
- Check for consistency in how instructions are phrased (imperative vs declarative)

### Phrasing Conventions

- Check UI action verbs: "select" vs "click" vs "tap" vs "choose"
- Check technical language level: "implement" vs "add" vs "set up"
- Check formality markers: contractions (can't vs cannot), second person (you), etc.

### Internal Consistency

- Even without a style guide, the document should be internally consistent
- If "dropdown" is used in one place, don't use "drop-down" elsewhere
- If imperative mood is used in one section ("Add the prop"), use it in all similar sections

## Scoring Rubric

### Violation

- Directly contradicts a rule in the style guide
- Uses a term the style guide explicitly forbids
- Example: Style guide says "never use 'simply'" and the doc contains "simply add the prop"

### Deviation

- Doesn't match the style guide's pattern but doesn't explicitly break a rule
- Inconsistent with the majority of the document
- Example: One section uses passive voice when the rest uses active

### Suggestion

- Could better match the style guide's intent
- An improvement opportunity, not a rule breach
- Example: "The component is used for navigation" could be more active: "Use this component for navigation"

## Output Format

Each finding should include:

```
[severity] Section: {section name} (line ~{number})
  Issue: {description of the voice issue}
  Current: "{the current text}"
  Suggested: "{the suggested alternative}"
  Rule: "{the style guide rule this relates to, if applicable}"
```

Group findings by severity: violations first, then deviations, then suggestions.

End with a summary:

```
Voice Review Summary:
  Violations: {count}
  Deviations: {count}
  Suggestions: {count}

  Overall: {brief assessment — e.g., "Strong voice alignment with a few terminology inconsistencies"}
```

## Edge Cases

- **Technical sections**: API documentation and code examples may naturally have a different tone than narrative sections. Don't flag technical precision as a voice issue.
