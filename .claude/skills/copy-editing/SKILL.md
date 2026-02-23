---
name: copy-editing
description: Evaluates grammar, spelling, and formatting in design systems documentation. Use when checking mechanics like spelling, punctuation, heading hierarchy, list formatting, and code example formatting.
---

# Copy Editing

Hard technique for evaluating grammar, spelling, and formatting in design systems documentation.

## Scope Boundary

The copy editor checks **mechanics**: grammar, spelling, punctuation, formatting, and structural consistency. It does NOT evaluate:
- **Voice or tone** — that's the voice reviewer's domain
- **Content completeness** — that's the completeness reviewer's domain
- **Readability level** — that's the readability reviewer's domain

If a sentence is grammatically correct but doesn't match the style guide's tone, don't flag it. If a section is thin, don't flag it. Stay in your lane.

## Spelling Checks

### DS-Specific Terminology
Common terms and their preferred spellings (flag deviations):

| Preferred | Common Variants to Flag |
|-----------|------------------------|
| dropdown | drop-down, drop down, DropDown |
| checkbox | check box, check-box, CheckBox |
| tooltip | tool tip, tool-tip, ToolTip |
| popover | pop over, pop-over, PopOver |
| dialog | dialogue (in UI context), Dialog |
| modal | Modal (when not a proper noun) |
| sidebar | side bar, side-bar |
| navbar | nav bar, nav-bar, navigation bar |
| login (noun/adj) | log in (noun/adj) |
| log in (verb) | login (verb) |
| setup (noun/adj) | set up (noun/adj) |
| set up (verb) | setup (verb) |
| frontend | front-end, front end |
| backend | back-end, back end |

**Important**: The built-in style guide at `.claude/dockit/style-guide.md` has its own terminology table. If it specifies a different preference, the style guide wins.

### General Spelling
- Check for common typos and misspellings
- Pay attention to technical terms: "accessibility" not "accessiblity", "responsive" not "reponsive"
- Watch for homophone errors: "its" vs "it's", "their" vs "there"

## Heading Hierarchy

### Rules
- Document should start with H1 (or the title)
- Heading levels should not skip (H2 → H4 without H3)
- Heading levels should be consistent: similar sections at the same level
- Headings should use consistent capitalization (title case or sentence case — pick one)

### Common Issues
- Multiple H1s in a single document
- Skipping from H2 to H4
- Inconsistent capitalization: "When to Use" then "Code examples" (mixing title and sentence case)

## List Formatting

### Parallel Structure
All items in a list should follow the same grammatical structure:

**Good** (all imperative):
- Add the component to your layout
- Set the variant prop
- Configure the event handlers

**Bad** (mixed structures):
- Add the component to your layout
- The variant prop should be set
- Event handler configuration

### Consistent Punctuation
- If list items are full sentences, end each with a period
- If list items are fragments, no ending punctuation (or consistent punctuation)
- Don't mix: some items with periods, some without

### Consistent Formatting
- All items should start with the same part of speech (verb, noun, etc.)
- Nested lists should be consistent with their parent list

## Code Example Formatting

### Language Tags
- All fenced code blocks should have a language tag: ```jsx, ```tsx, ```css, etc.
- Language tags should be consistent: don't use ```js in one place and ```javascript in another

### Indentation
- Consistent indentation within code blocks (2 spaces or 4 spaces — pick one)
- Indentation should match the project's conventions if known

### Completeness
- Code examples should be syntactically valid (not truncated mid-statement)
- Imports should be included if they're needed to understand the example
- Props used in examples should match the Props/API section

## Link Formatting

### Rules
- Links should have descriptive text, not "click here" or bare URLs
- Internal links (to other docs) should be relative paths
- External links should be complete URLs
- No broken link patterns (empty href, placeholder URLs like example.com)

### Common Issues
- `[link](url)` where "link" is the anchor text — not descriptive
- `[](url)` — empty anchor text
- `[text]()` — empty URL
- Bare URLs in prose without markdown link formatting

## Terminology Consistency

### Within the Document
- Component names should be identical everywhere they appear
- Prop names should match between prose and code (case-sensitive)
- State names (hover, focus, disabled) should be consistent
- If you call it a "variant" in one section, don't call it a "variation" in another

### Formatting of Technical Terms
- Component names in prose: follow the project's convention (PascalCase, backtick-wrapped, etc.)
- Prop names in prose: typically in backticks or code formatting
- CSS class names: in code formatting
- Consistent treatment throughout

## Punctuation

### Common Issues
- Serial (Oxford) comma: be consistent (either always or never)
- Em dash usage: `—` not `--` or ` - ` (unless the style guide says otherwise)
- Quotation marks: consistent use of straight or curly quotes
- Ellipsis: `...` not `. . .`
- Spaces before/after punctuation: no double spaces, no space before comma/period

## Output Format

Each finding:

```
[severity] Section: {section name} (line ~{number})
  Issue: {description}
  Current: "{the current text}"
  Suggested: "{the corrected text}"
  Rule: {which rule this falls under}
```

Severity levels for copy editing:
- `[critical]` — Spelling error in a heading, broken code example, skipped heading level
- `[suggestion]` — Inconsistent formatting, parallel structure issue
- `[nitpick]` — Minor punctuation, optional style preference

Group findings by section, then by severity within each section.

End with summary:

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
