---
name: completeness-evaluation
description: Evaluates whether documentation sections have substantive content. Use when checking whether planned sections are complete, thin, placeholders, or missing.
---

# Completeness evaluation

Hard technique for evaluating whether documentation sections have substantive content. Refer to `sections.md` for the full list of sections and their requirements.

## How to evaluate completeness

<evaluation_steps>

### Step 1: Read the structure document

Read `.planning/docs/{doc-name}/structure.md` to know what sections the user chose. Only evaluate the sections in `.planning/docs/{doc-name}/structure.md`, not a theoretical maximum.

### Step 2: Map sections to content

For each planned section, find it in the actual `docs/{doc-name}.md` file. Check:

- Does the section heading exist?
- Is there content under the heading?

### Step 3: Assess substance

For each section present in the document, evaluate the substance according to the following levels.

</evaluation_steps>

## Section status levels

<status_levels>

### Complete

- Section has substantive content that addresses its purpose
- Guiding questions from `sections.md` are answered
- Content is specific, not generic
- Cross-references to other sections are present where expected

### Thin

- Section exists and has real content, but it is insufficient
- Missing key aspects that the section should cover
- Too brief to be useful on its own
- Example: a "Variants" section that lists variant names but does not explain when to use each one

### Placeholder

- Section heading exists but has placeholder or minimal content
- Not useful to a reader in its current state
- Contains one of the following placeholder patterns:
  - TODO, TBD, TBC, FIXME
  - "Coming soon", "To be added", "To be documented"
  - "See [link]" with no other content (a link alone is not documentation)
  - A single sentence (unless the section genuinely only needs one, such as "Name")
  - Only a heading and a subheading with no content
  - Lorem ipsum or other placeholder text
  - Repeated content from another section (copy-paste without adaptation)

### Missing

- Section was in `structure.md` but has no corresponding heading in the doc
- Or heading exists but there is no content below it

</status_levels>

## Minimum content thresholds

These are guidelines, not rules. Context matters.

<minimum_thresholds>

### Constructs

| Section type | Minimum expectation |
| :----------- | :------------------ |
| Metadata | The name, documentation type, and tier are stated clearly |
| Description | A clear, concise description that someone unfamiliar with the concept could understand |
| Anatomy | A numbered list of parts, each with a name and description, and a link to an annotated screenshot |
| Usage | Provides an understanding of how the construct should be used |
| Interactions | Lists the most important interactions that this construct has |
| Examples | A few scenarios showing how the construct is applied, including an image and description for each scenario |
| Properties | A list of the most important properties of this construct |

### Concepts

| Section type | Minimum expectation |
| :----------- | :------------------ |
| Metadata | The name, documentation type, and tier are stated clearly |
| Description | A clear, concise description that someone unfamiliar with the concept could understand |
| Content | Provides the minimum amount of content that a reader would need to understand the core of this concept |

</minimum_thresholds>

## Cross-reference checks

<cross_references>

Sections should reference each other where appropriate:

- "When to use" and "When not to use" should reference specific variants or states mentioned earlier
- Usage guidelines or properties should reference the anatomy parts from the Anatomy section
- "When not to use" should reference other components of the design system that could be used instead

Flag when these cross-references are missing — it usually indicates incomplete thinking.

</cross_references>

## Internal consistency checks

<consistency>

- Component name should be identical across all sections
- Variant names should match between Variants and Do's/Don'ts

</consistency>

## Output format

<output_format>

```
━━━ Completeness Review ━━━

Section Status:
  [done] Name — Complete
  [done] Description — Complete
  [warning] When to Use — Thin: only 1 scenario listed, recommend 2-3
  [done] When Not to Use — Complete
  [done] Anatomy — Complete
  [warning] Variants — Thin: variants listed but missing use-case rationale
  [skip] States — Placeholder: contains "TBD"
  [done] Props / API — Complete
  [warning] Accessibility — Thin: missing screen reader behaviour
  [done] Content Guidelines — Complete
  [done] Code Examples — Complete
  [skip] Do's and Don'ts — Missing: no section found in document

Cross-Reference Issues:
  - Do's and Don'ts should reference the 3 variants described in Variants section
  - Code Examples do not demonstrate the "compact" variant

Consistency Issues:
  - Props section calls it "isDisabled" but Code Examples use "disabled"

Summary:
  Complete: 7/12
  Thin: 3/12
  Placeholder: 1/12
  Missing: 1/12
  Cross-reference issues: 2
  Consistency issues: 1
```

</output_format>
