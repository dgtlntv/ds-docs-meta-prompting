---
name: dockit:check-voice
description: "Run voice review only"
allowed-tools: [Read, Write, Glob, Grep, Task]
---

<objective>
Run only the voice reviewer against the current document.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-voice-reviewer.md
- @.claude/skills/brand-voice.md
</execution_context>

<process>
1. Read .planning/STATE.md to identify the current document
2. Read the documentation file and the built-in style guide at .claude/dockit/style-guide.md
3. Spawn the voice reviewer agent (@.claude/agents/dockit-voice-reviewer.md) via Task tool
4. Present findings using the standard review format
5. If a review report already exists, update the voice section

Display: ━━━ dockit ► VOICE REVIEW ━━━
</process>
