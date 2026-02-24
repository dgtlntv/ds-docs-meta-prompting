---
name: brand-voice-evaluation
description: Evaluates documentation against the team's brand guidelines. Use when reviewing docs for tone, terminology, sentence structure, and phrasing consistency.
---

# Brand Voice Evaluation

Hard technique for evaluating documentation against a team's brand voice guidelines.

## The style guide

dockit ships with a built-in style guide at @{AGENT_FOLDER}/dockit/references/style-guide.md. This is the source of truth for all voice evaluation — always read it before evaluating any content.

Read the entire style guide before evaluating any content. Build a mental checklist from it.

## What to check

<checks>

### Tone alignment

- Does the document's tone match the descriptors in the style guide?
- Is the tone consistent throughout, or does it shift between sections?
- Are there sections that feel noticeably different from the rest?

### Consistent terminology

- Does the document use the preferred terms listed in the style guide?
- Does the document use any forbidden words or phrases?
- Does the document use any of the words and phrases to avoid?
- Pattern: if the style guide says "use X not Y", search the entire document for every instance of Y

### Sentence structure

- Flag passive voice sentence constructions
- Flag violations of the target sentence length
- Suggest changes for sentences that violate the maximum sentence length
- Check for consistency in how instructions are phrased (for example, imperative versus declarative)

### Phrasing conventions

- Flag forbidden usage of UI action verbs
- Check technical language level
- Check formality markers

### Internal consistency

Even without a style guide, the document should be internally consistent:

- If "dropdown" is used in one place, do not use "drop-down" elsewhere
- If imperative mood is used in one section ("Add the prop"), use it in all similar sections

</checks>

## Scoring rubric

<scoring>

### Violation

- Directly contradicts a rule in the style guide
- Uses a term the style guide explicitly forbids
- Example: Style guide says "never use 'simply'" and the doc contains "simply add the prop"

### Deviation

- Does not match the style guide's pattern but does not explicitly break a rule
- Inconsistent with the majority of the document
- Example: One section uses passive voice when the rest uses active

### Suggestion

- Could better match the style guide's intent
- An improvement opportunity, not a rule breach
- Example: "The component is used for navigation" could be more active: "Use this component for navigation"

</scoring>

## Output format

<output_format>

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

</output_format>
