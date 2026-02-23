---
name: dockit:rewrite
description: "Help rewrite a specific section"
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion]
---

<objective>
Help the user rewrite a specific section of their documentation by presenting context, review findings, and structural suggestions.
</objective>

<execution_context>
References:
- @.claude/dockit/workflows/rewrite-section.md
- @.claude/dockit/references/questioning.md
- @.claude/dockit/references/section-checklists.md
- @.claude/dockit/references/ui-formatting.md
</execution_context>

<process>
Follow the rewrite-section workflow (@.claude/dockit/workflows/rewrite-section.md):

1. Identify which section to rewrite (from argument or by asking)
2. Read the current section content, style guide, and any review findings
3. Present the current text alongside the issues found
4. Suggest 1-2 structural approaches (not full rewrites)
5. Wait for the user to write their revised version
6. Quick-check the revision against the original findings
7. Apply the changes and update the review report

Remember: suggest approaches, not content. The user writes.

Display: ━━━ dockit ► REWRITE ━━━
</process>
