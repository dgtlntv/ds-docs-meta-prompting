# UI formatting

How dockit agents format their terminal output for consistency.

## Overview

dockit output should feel calm and structured — like well-typeset documentation, not a dashboard. Use whitespace and text hierarchy to create clarity. Avoid decorative characters, box drawing, and emoji.

All agents and workflows reference this file for visual consistency.

---

## Design principles

<design_principles>

- **Quiet over loud** — let content breathe. Use whitespace to separate, not borders.
- **Hierarchy through typography** — uppercase labels, bold text, and indentation create structure without decoration.
- **Consistent markers** — use the same status markers everywhere. No improvisation.
- **No decoration** — no box-drawing characters (╔═╗, ━━━), no emoji, no progress bars. The text is the interface.

</design_principles>

---

## Phase headers

Use when entering a new phase or at the start of a command response. Uppercase phase name, preceded by the dockit label.

<phase_headers>

```
dockit · DISCOVERY

dockit · STRUCTURE

dockit · DRAFTING

dockit · REVISION

dockit · REVIEW

dockit · POLISH
```

Phase headers stand alone on their own line with a blank line above and below.

</phase_headers>

---

## Status markers

Use these markers consistently across all output. Do not invent new ones.

<status_markers>

```
[·] pending
[~] draft
[=] revised
[?] in review
[✓] complete
[—] skipped
[!] needs attention
```

</status_markers>

---

## Section status display

Use when showing the state of sections in a document. Appears in `/dockit:start`, `/dockit:progress`, and after completing work on a section.

<section_status>

```
dockit · DRAFTING

  Button

  [✓] Metadata
  [=] Description
  [~] Anatomy
  [·] Usage
  [·] Interactions
  [·] Examples
  [·] Properties

  3/7 complete · 1 revised · 1 draft · 3 pending
```

</section_status>

---

## Next action

Use after completing a step to tell the user what to do next. Keep it to one recommended action. If there are alternatives, list them below.

<next_action>

Single action:

```
  Next: run /dockit:start to begin writing content
```

Multiple options:

```
  Next: run /dockit:start to continue drafting

  Also:
    /dockit:add-section — add more sections
    /dockit:progress — view overall progress
```

</next_action>

---

## Confirmations

Use after a state change — marking a section as draft, completing structure, finishing a document. State what changed, then show the next action.

<confirmations>

```
  Anatomy marked as draft.

  Next: run /dockit:start to continue
```

```
  Structure complete. Created docs/button.md with 7 sections.

  Next: run /dockit:start to begin writing content
```

```
  All sections complete. Button documentation is finished.
```

</confirmations>

---

## Section context

Use when presenting a section for the user to draft. Show the section name, its position, and the guiding questions.

<section_context>

```
dockit · DRAFTING

  Section: Usage (4/7)

  This section covers how and when to use this construct, including
  scenarios where it is the right choice and where it is not.

  To get you started:
    · What is the most common scenario where someone reaches for this?
    · When might someone think they need this but actually need something else?
    · Are there conditions that affect whether this is the right choice?
```

</section_context>

---

## Review findings

Individual findings follow the format defined in each review skill. When presenting them in the terminal, group by severity with a label.

<review_findings>

```
dockit · REVIEW

  Button — 12 findings


  VIOLATIONS (2)

  [!] Section: Description (line ~4)
      Issue: uses forbidden word "simply"
      Current: "Simply add the button to your layout"
      Suggested: "Add the button to your layout"
      Rule: forbidden words — style guide

  [!] Section: Usage (line ~18)
      Issue: uses "click" instead of "select"
      Current: "Click the button to submit"
      Suggested: "Select the button to submit"
      Rule: accessibility in writing — style guide


  DEVIATIONS (4)

  ...


  SUGGESTIONS (6)

  ...
```

</review_findings>

---

## Review summary

Use after all reviewers have completed. Show counts per reviewer, then the total.

<review_summary>

```
  Review complete.

  Voice:        2 violations · 3 deviations · 1 suggestion
  Readability:  grade 9.1 — 2 findings
  Completeness: 6/7 complete · 1 thin
  Copy editing: 1 critical · 2 suggestions

  Total: 12 findings across 4 reviewers
```

</review_summary>

---

## Progress display

Use for `/dockit:progress` when showing status across multiple documents.

<progress_display>

```
dockit · PROGRESS

  Button (component · global)
    Phase: In progress
    [✓] Metadata  [✓] Description  [~] Anatomy  [·] Usage
    [·] Interactions  [·] Examples  [·] Properties
    2/7 complete · 1 draft · 4 pending

  Navigation (complex component · apps)
    Phase: Review
    [✓] Metadata  [✓] Description  [✓] Anatomy  [✓] Usage
    [?] Interactions  [?] Examples  [?] Properties
    4/7 complete · 3 in review
```

</progress_display>

---

## Errors

Use when a prerequisite is not met or something is wrong. State the problem and what to do about it.

<errors>

```
  No documentation in progress.

  Run /dockit:start to begin a new document.
```

```
  Cannot run review — 2 sections are not yet revised:
    [~] Anatomy (draft)
    [·] Usage (pending)

  Run /dockit:start to finish these sections first.
```

</errors>

---

## Agent spawning

Use when spawning subagents for revision or review.

<spawning>

```
  Spawning revision agent for Anatomy...

  Spawning 4 review agents:
    · Voice reviewer
    · Readability reviewer
    · Completeness reviewer
    · Copy editor
```

```
  Voice reviewer complete — 6 findings.
  Readability reviewer complete — 2 findings.
  Completeness reviewer complete — 1 finding.
  Copy editor complete — 3 findings.
```

</spawning>

---

## Anti-patterns

<anti_patterns>

- Do not use box-drawing characters (━━━, ╔══╗, ───).
- Do not use emoji in any output.
- Do not use progress bars.
- Do not vary the formatting between agents — all agents follow this file.
- Do not add preamble before phase headers. Start with the header.
- Do not repeat information the user has already seen in the same interaction.

</anti_patterns>
