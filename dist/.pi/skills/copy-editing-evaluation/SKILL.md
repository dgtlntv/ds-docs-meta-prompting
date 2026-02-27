---
name: copy-editing-evaluation
description: Evaluates grammar, spelling, and formatting in design systems' documentation. Use when checking mechanics like spelling, punctuation, heading hierarchy, and list formatting.
---

# Copy editing

Hard technique for evaluating grammar, spelling, and formatting in design systems documentation.

## Two-pass approach

1. **Deterministic pass**: Run the `copy-editing` script to get objective findings
2. **Qualitative pass**: Apply LLM judgment on top for context-dependent factors

The deterministic pass catches spelling errors, flagged words, heading issues, and formatting problems. The qualitative pass covers everything else: list structure, link quality, terminology consistency, and punctuation style.

## Running the script

Run `copy-editing.js` from the same directory as this skill file. Pass the path to a markdown file as the only argument.

```bash
node <skill-directory>/copy-editing.js <file.md>
```

The script:

- Checks spelling using cspell with a standard English dictionary
- Flags words from @.pi/dockit/references/flagged-words.txt in the style guide references directory (includes forbidden words and words with preferred substitutions)
- Checks heading hierarchy (skipped levels, multiple H1s) and sentence case
- Detects em-dashes
- Outputs JSON to stdout

Multi-word phrases in @.pi/dockit/references/flagged-words.txt (e.g. "in order to", "end user") are not detected by the script. Flag those during the qualitative pass.

### Output structure

The script outputs a JSON object with five keys:

```json
{
  "spelling": [
    {
      "word": "componnet",
      "line": 5,
      "offset": 4
    }
  ],
  "forbiddenWords": [
    {
      "word": "ensure",
      "line": 9,
      "lineText": "Please ensure that you use the correct variant.",
      "suggestion": "make sure"
    },
    {
      "word": "simply",
      "line": 5,
      "lineText": "Simply add the component to your page."
    }
  ],
  "headings": [
    {
      "type": "skipped-level",
      "line": 7,
      "text": "Skipped heading",
      "message": "Heading level skipped: H2 → H4. Expected H3."
    },
    {
      "type": "multiple-h1",
      "line": 17,
      "text": "Second title",
      "message": "Multiple H1 headings found. ..."
    },
    {
      "type": "not-sentence-case",
      "line": 21,
      "text": "This Is Title Case",
      "message": "Heading is not in sentence case: \"This Is Title Case\"."
    }
  ],
  "formatting": [
    {
      "type": "em-dash",
      "line": 5,
      "lineText": "The button component — one of the most common — is used for actions.",
      "message": "Em-dash (—) found. Use an alternative phrasing or punctuation."
    }
  ],
  "summary": {
    "spelling": 1,
    "forbiddenWords": 2,
    "headings": 3,
    "formatting": 1,
    "total": 7
  }
}
```

**`spelling`** — misspelled words detected by cspell. Each entry has the `word`, the `line` number (1-indexed), and the character `offset` from the start of the file.

**`forbiddenWords`** — words from @.pi/dockit/references/flagged-words.txt found in the document. Entries with a `suggestion` field are words that have a preferred replacement. Entries without `suggestion` are strictly forbidden and should be removed or the sentence restructured.

**`headings`** — heading hierarchy and capitalisation issues. The `type` field is one of `skipped-level`, `multiple-h1`, or `not-sentence-case`. The `message` field provides a human-readable description.

**`formatting`** — punctuation issues. Currently detects em-dashes (`—`).

**`summary`** — counts of issues by category and a `total` across all categories.

## Scope boundary

The copy editor checks mechanics: grammar, spelling, punctuation, formatting, and structural consistency. It does not evaluate:

- Voice or tone
- Content completeness
- Readability grade level

If a sentence is grammatically correct but does not match the style guide's tone, do not flag it. If a section is thin, do not flag it. Stay in your lane.

## Qualitative checks

The following checks are performed by the LLM during the qualitative pass. The script does not cover these.

### Multi-word flagged phrases

The script only flags single words. During the qualitative pass, also check for multi-word phrases from @.pi/dockit/references/flagged-words.txt such as "in order to", "for the purpose of", "end user", and "in conjunction with".

### Spelling: DS-specific terminology

<spelling>

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

The style guide at @.pi/dockit/references/style-guide.md has its own terminology section. If it specifies a different preference, the style guide wins.

</spelling>

### List formatting

<lists>

#### Parallel structure

All items in a list should follow the same grammatical structure.

**Good** (all imperative):
- Add the component to your layout
- Set the variant prop
- Configure the event handlers

**Bad** (mixed structures):
- Add the component to your layout
- The variant prop should be set
- Event handler configuration

#### Consistent punctuation

- Do not use punctuation if list items are one sentence or less
- Use periods if at least one item in the list contains more than one sentence
- If you use a period for one item, use periods for every item in that list

</lists>

### Link formatting

<links>

- Links should have descriptive text, not "click here" or bare URLs
- Internal links should be relative paths
- External links should be complete URLs
- No broken link patterns (empty href, placeholder URLs)

</links>

### Terminology consistency

<terminology>

Use the `explore-existing-design-systems-documentation` skill to check:

- Component names are identical everywhere they appear
- Prop names match between prose and code (case-sensitive)
- State names (hover, focus, disabled) are consistent
- If you call it a "variant" in one section, do not call it a "variation" in another

</terminology>

### Punctuation

<punctuation>

- Use a serial (Oxford) comma
- Consistent use of double quotation marks
- Ellipsis: `...` not `. . .`
- No double spaces, no space before comma or period

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
  Links: {count} findings
  Terminology: {count} findings
  Punctuation: {count} findings
  Formatting: {count} findings

  Total: {count} findings ({critical} critical, {suggestions} suggestions, {nitpicks} nitpicks)
```

</output_format>
