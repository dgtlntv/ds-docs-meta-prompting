---
name: dockit:check-readability
description: "Run readability review only"
allowed-tools: [Read, Write, Glob, Bash, Task]
---

<objective>
Run only the readability reviewer against the current document.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-readability-reviewer.md
- @.claude/skills/readability.md
</execution_context>

<process>
1. Read .planning/STATE.md to identify the current document
2. Run the readability scoring script: python3 .claude/scripts/readability-score.py docs/{doc-name}.md
3. Spawn the readability reviewer agent (@.claude/agents/dockit-readability-reviewer.md) via Task tool, providing the script output
4. Present deterministic scores + qualitative findings
5. If a review report already exists, update the readability section

Display: ━━━ dockit ► READABILITY REVIEW ━━━
</process>
