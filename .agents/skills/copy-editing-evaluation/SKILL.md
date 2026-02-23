---
name: copy-editing-evaluation
description: Evaluates grammar, spelling, and formatting in design systems' documentation. Use when checking mechanics like spelling, punctuation, heading hierarchy, and list formatting.
---

# Copy editing

Hard technique for evaluating grammar, spelling, and formatting in design systems documentation.

## Two-pass approach

1. **Deterministic pass**: Run `.claude/scripts/copy-editing.py` to get objective metrics
2. **Qualitative pass**: Apply LLM judgment on top for context-dependent factors

The deterministic score provides the baseline. The LLM adds nuance that formulas cannot capture.

## Scope boundary

The copy editor checks mechanics: grammar, spelling, punctuation, formatting, and structural consistency. It does not evaluate:

- Voice or tone
- Content completeness
- Readability grade level

If a sentence is grammatically correct but does not match the style guide's tone, do not flag it. If a section is thin, do not flag it. Stay in your lane.

## Spelling checks

<spelling>

### DS-specific terminology

Common terms and their preferred spellings. Flag deviations.

| Preferred | Common variants to flag |
| :-------- | :---------------------- |
| dropdown | drop-down, drop down, DropDown |
| checkbox | check box, check-box, CheckBox |
| tooltip | tool tip, tool-tip, ToolTip |
| popover | pop over, pop-over, PopOver |
| dialog | dialogue (in UI context), Dialog |
| modal | Modal (when not a proper noun) |
| open source | open-source |
| sidebar | side bar, side-bar |
| navbar | nav bar, nav-bar, navigation bar |
| login (noun/adj) | log in (noun/adj) |
| log in (verb) | login (verb) |
| setup (noun/adj) | set up (noun/adj) |
| set up (verb) | setup (verb) |
| frontend | front-end, front end |
| backend | back-end, back end |
| webpage | web page |

The built-in style guide at `.claude/dockit/style-guide.md` has its own terminology table. If it specifies a different preference, the style guide wins.

### General spelling

- Use US English spelling
- Check for common typos and misspellings
- Pay attention to technical terms: "accessibility" not "accessiblity", "responsive" not "reponsive"
- Watch for homophone errors: "its" vs "it's", "their" vs "there"

</spelling>

## Heading hierarchy

<headings>

### Rules

- The document should start with H1 (or the title)
- Heading levels should not skip (H2 → H4 without H3)
- Heading levels should be consistent: similar sections at the same level
- Headings should use sentence case

### Common issues

- Multiple H1s in a single document
- Skipping from H2 to H4
- Inconsistent capitalisation: "When to Use" then "Code examples" (mixing title and sentence case)

</headings>

## List formatting

<lists>

### Parallel structure

All items in a list should follow the same grammatical structure.

**Good** (all imperative):
- Add the component to your layout
- Set the variant prop
- Configure the event handlers

**Bad** (mixed structures):
- Add the component to your layout
- The variant prop should be set
- Event handler configuration

### Consistent punctuation

- Do not use punctuation if list items are one sentence or less
- Use periods if at least one item in the list contains more than one sentence
- If you use a period for one item to accommodate multiple sentences, use periods for every item in that list to maintain consistency

### Consistent formatting

- All items should start with the same part of speech (verb, noun, etc.)
- Nested lists should be consistent with their parent list

</lists>

## Link formatting

<links>

### Rules

- Links should have descriptive text, not "click here" or bare URLs
- Internal links (to other docs) should be relative paths
- External links should be complete URLs
- No broken link patterns (empty href, placeholder URLs like example.com)

### Common issues

- `[link](url)` where "link" is the anchor text — not descriptive
- `[](url)` — empty anchor text
- `[text]()` — empty URL
- Bare URLs in prose without markdown link formatting

</links>

## Consistent terminology

<terminology>

### Within the design systems documentation

Use the `explore-existing-design-systems-documentation` skill to explore the existing design systems documentation to check the following:

- Component names should be identical everywhere they appear
- Prop names should match between prose and code (case-sensitive)
- State names (hover, focus, disabled) should be consistent
- If you call it a "variant" in one section, do not call it a "variation" in another

### Formatting of technical terms

- Component names in prose: follow the project's convention (PascalCase, backtick-wrapped, etc.)
- Prop names in prose: typically in backticks or code formatting
- CSS class names: in code formatting
- Consistent treatment throughout

</terminology>

## Punctuation

<punctuation>

### Common issues

- Use a serial (Oxford) comma
- Quotation marks: consistent use of double quotation marks
- Ellipsis: `...` not `. . .`
- Spaces before/after punctuation: no double spaces, no space before comma/period

</punctuation>

## Output format

<output_format>

Each finding:

```
[severity] Section: {section name} (line ~{number})
  Issue: {description}
  Current: "{the current text}"
  Suggested: "{the corrected text}"
  Rule: {which rule this falls under}
```

<severity_levels>

Severity levels for copy editing:

- `[critical]` — Spelling error in a heading, broken code example, skipped heading level
- `[suggestion]` — Inconsistent formatting, parallel structure issue
- `[nitpick]` — Minor punctuation, optional style preference

</severity_levels>

Group findings by section, then by severity within each section.

End with a summary:

```
Copy Editing Summary:
  Spelling: {count} findings
  Headings: {count} findings
  Lists: {count} findings
  Code: {count} findings
  Links: {count} findings
  Terminology: {count} findings
  Punctuation: {count} findings

  Total: {count} findings ({critical} critical, {suggestions} suggestions, {nitpicks} nitpicks)
```

</output_format>
