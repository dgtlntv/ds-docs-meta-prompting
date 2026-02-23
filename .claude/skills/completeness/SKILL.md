---
name: completeness
description: Evaluates whether documentation sections have substantive content. Use when checking if planned sections are complete, thin, stub, or missing.
---

# Completeness Evaluation

Hard technique for evaluating whether documentation sections have substantive content.

## How to Evaluate Completeness

### Step 1: Read the Structure
Read `.planning/docs/{doc-name}/structure.md` to know what sections were planned. This is the user's chosen list — evaluate against what they committed to, not a theoretical maximum.

### Step 2: Map Sections to Content
For each planned section, find it in the actual `docs/{doc-name}.md` file. Check:
1. Does the section heading exist?
2. Is there content under the heading?
3. Is the content substantive?

### Step 3: Assess Substance

## Section Status Levels

### Complete
- Section has substantive content that addresses its purpose
- Guiding questions from `section-checklists.md` are adequately covered
- Content is specific, not generic filler
- Cross-references to other sections are present where expected

### Thin
- Section exists and has real content, but it's insufficient
- Missing key aspects that the section should cover
- Too brief to be useful on its own
- Examples: a "Variants" section that lists variant names but doesn't explain when to use each one

### Stub
- Section heading exists but content is placeholder or minimal
- Contains one of the stub patterns (see below)
- Not useful to a reader in its current state

### Missing
- Section was in `structure.md` but has no corresponding heading in the doc
- Or heading exists but there is zero content below it

## Stub Detection Patterns

Flag any section that contains ONLY:

- `TODO`, `TBD`, `TBC`, `FIXME`
- "Coming soon", "To be added", "To be documented"
- "See [link]" with no other content (a link alone is not documentation)
- A single sentence (unless the section genuinely only needs one — like "Name")
- Only a heading and a subheading with no content
- Lorem ipsum or other placeholder text
- Repeated content from another section (copy-paste without adaptation)

## Minimum Content Thresholds

These are guidelines, not rigid rules. Context matters.

| Section Type | Minimum Expectation |
|-------------|---------------------|
| Name | Component name clearly stated (1 line is fine) |
| Description | 2-4 sentences minimum |
| When to Use | At least 2 scenarios |
| When Not to Use | At least 1 anti-pattern with alternative |
| Anatomy | All parts named and described |
| Variants | Each variant named with use-case rationale |
| States | All interactive states documented |
| Props / API | All props with type, default, description |
| Accessibility | Keyboard, screen reader, ARIA, WCAG reference |
| Content Guidelines | Guidance per text element in the component |
| Code Examples | At least basic usage example |
| Do's and Don'ts | At least 3 pairs with rationale |
| Related Components | At least 1 related component with relationship type |

## Cross-Reference Checks

Sections should reference each other where appropriate:

- **Do's and Don'ts** should reference specific variants or states mentioned earlier
- **Accessibility** should reference specific states (focus, disabled) documented in the States section
- **Code Examples** should demonstrate variants described in the Variants section
- **Content Guidelines** should reference the anatomy parts from the Anatomy section
- **When Not to Use** should reference the alternatives listed in Related Components

Flag when these cross-references are missing — it usually indicates incomplete thinking.

## Internal Consistency Checks

- Component name should be identical across all sections
- Prop names in the Props/API section should match those used in Code Examples
- State names should be consistent between States, Accessibility, and Code Examples
- Variant names should match between Variants, Code Examples, and Do's/Don'ts

## Output Format

```
━━━ Completeness Review ━━━

Section Status:
  [done] Name — Complete
  [done] Description — Complete
  [warning] When to Use — Thin: only 1 scenario listed, recommend 2-3
  [done] When Not to Use — Complete
  [done] Anatomy — Complete
  [warning] Variants — Thin: variants listed but missing use-case rationale
  [skip] States — Stub: contains "TBD"
  [done] Props / API — Complete
  [warning] Accessibility — Thin: missing screen reader behavior
  [done] Content Guidelines — Complete
  [done] Code Examples — Complete
  [skip] Do's and Don'ts — Missing: no section found in document

Cross-Reference Issues:
  - Do's and Don'ts should reference the 3 variants described in Variants section
  - Code Examples don't demonstrate the "compact" variant

Consistency Issues:
  - Props section calls it "isDisabled" but Code Examples use "disabled"

Summary:
  Complete: 7/12
  Thin: 3/12
  Stub: 1/12
  Missing: 1/12
  Cross-reference issues: 2
  Consistency issues: 1
```
