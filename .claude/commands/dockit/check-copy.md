---
name: dockit:check-copy
description: "Run copy editing review only"
allowed-tools: [Read, Write, Glob, Task]
---

<objective>
Run only the copy editor against the current document.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-copy-editor.md
- @.claude/skills/copy-editing.md
</execution_context>

<process>
1. Read .planning/STATE.md to identify the current document
2. Read docs/{doc-name}.md
3. Spawn the copy editor agent (@.claude/agents/dockit-copy-editor.md) via Task tool
4. Present findings grouped by category (spelling, headings, lists, code, links, terminology, punctuation)
5. If a review report already exists, update the copy editing section

Display: ━━━ dockit ► COPY EDITING REVIEW ━━━
</process>
