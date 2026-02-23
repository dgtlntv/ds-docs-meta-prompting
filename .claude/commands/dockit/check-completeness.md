---
name: dockit:check-completeness
description: "Run completeness review only"
allowed-tools: [Read, Write, Glob, Task, mcp__figma]
---

<objective>
Run only the completeness reviewer against the current document.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-completeness-reviewer.md
- @.claude/skills/completeness.md
- @.claude/skills/figma-context.md
</execution_context>

<process>
1. Read .planning/STATE.md to identify the current document
2. Read .planning/docs/{doc-name}/structure.md to know what sections were planned
3. Read docs/{doc-name}.md to see the actual content
4. Spawn the completeness reviewer agent (@.claude/agents/dockit-completeness-reviewer.md) via Task tool
5. Present section-by-section status + cross-reference issues
6. If a review report already exists, update the completeness section

Display: ━━━ dockit ► COMPLETENESS REVIEW ━━━
</process>
