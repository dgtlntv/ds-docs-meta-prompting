# UI Formatting Reference

TODO: Have our own formatting here. Probably heavily inspired from GSD
TODO: Probably more that can be done here, look at: https://github.com/gsd-build/get-shit-done/blob/main/get-shit-done/references/ui-brand.md

How all dockit agents format their responses for consistency.

## Phase Banners

Use phase banners to mark workflow transitions:

```
━━━ dockit ► DISCOVERY ━━━
━━━ dockit ► STRUCTURE ━━━
━━━ dockit ► DRAFTING ━━━
━━━ dockit ► REVIEW ━━━
━━━ dockit ► POLISH ━━━
```

Display the banner when entering a new phase or at the start of a command response.

## Status Symbols

Use these symbols consistently:

- `[done]` — Section or task complete
- `[pending]` — Not yet started
- `[active]` — Currently in progress
- `[warning]` — Needs attention or has issues
- `[skip]` — User chose to skip

## Progress Display

Show section count when relevant:

```
Progress: 5/12 sections complete
```

In checklist format:

```
[done] Name
[done] Description
[done] When to Use
[done] When Not to Use
[done] Anatomy
[active] Variants
[pending] States
[pending] Props / API
[pending] Accessibility
[pending] Content Guidelines
[pending] Code Examples
[pending] Do's and Don'ts
```

## Review Findings Format

Each finding follows this structure:

```
[severity] Section: Section Name (line ~N)
  Issue: Description of the problem
  Current: "the current text"
  Suggested: "the suggested improvement"
```

Severity tags:

- `[critical]` — Must fix: contradicts style guide, factually incorrect, or accessibility issue
- `[suggestion]` — Should consider: improves quality but not a hard rule violation
- `[nitpick]` — Nice to have: minor polish, optional

## Review Summary Format

After all findings, show a summary:

```
━━━ Review Summary ━━━
Voice:         3 findings (1 critical, 2 suggestions)
Readability:   Grade level 9.2 — 2 findings
Completeness:  10/12 sections complete, 2 thin
Copy:          5 findings (all nitpicks)

Total: 12 findings across 4 reviewers
```

## Next-Up Block

After completing a phase or command, show the next recommended action:

```
━━━
Next: Run /dockit:continue to start writing content
━━━
```

Or when multiple options exist:

```
━━━
Next steps:
  /dockit:continue — Start writing content for "Button"
  /dockit:progress — View overall progress
  /dockit:help — See all available commands
━━━
```

## Section Headers in Drafting

When presenting a section for the user to write:

```
━━━ dockit ► DRAFTING ━━━

Section: Accessibility (9/12)

This section covers keyboard interaction, screen reader behavior,
ARIA attributes, and WCAG criteria for this component.

Questions to consider:
  1. How does someone use this with only a keyboard?
  2. What does a screen reader announce when interacting with this?
  3. What ARIA roles or attributes does this component use?
  4. Which WCAG success criteria apply?
```

## Anti-Patterns

- **No random emoji.** Use the defined status symbols only.
- **No walls of text.** Break output into clear sections with headers.
- **No inconsistent formatting.** Always use the same symbols and structure.
- **No repeating the same information.** State it once clearly.
- **No preamble.** Start with the banner or the relevant content immediately.
