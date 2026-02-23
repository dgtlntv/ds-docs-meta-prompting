---
name: dockit:progress
description: "Show documentation progress across all docs"
allowed-tools: [Read, Glob]
---

<objective>
Read STATE.md and all checklists to present a comprehensive progress summary.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
</execution_context>

<process>
1. Read .planning/STATE.md to get the list of all documents and their phases
2. For each document, read .planning/docs/{doc-name}/checklist.md to get section-level progress
3. If review reports exist (.planning/reviews/{doc-name}-review.md), read finding counts
4. Present a summary for each document:

━━━ dockit ► PROGRESS ━━━

Document: {doc-name}
  Type: {doc-type}
  Phase: {phase}
  Sections: {complete}/{total} complete
  {per-section status list}
  {review findings summary if in Review/Polish phase}

If no .planning/STATE.md exists, inform the user:
  "No documentation in progress. Run /dockit:new to start."
</process>
