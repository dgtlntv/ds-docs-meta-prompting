---
name: dockit:continue
description: "Resume work on current documentation"
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion, mcp__figma]
---

<objective>
Resume work on the current in-progress document at whatever phase it's in.
</objective>

<execution_context>
References:
- @.claude/dockit/workflows/continue-doc.md
- @.claude/dockit/references/questioning.md
- @.claude/dockit/references/phases.md
- @.claude/dockit/references/section-checklists.md
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-questioner.md
- @.claude/skills/figma-context.md
</execution_context>

<process>
Follow the continue-doc workflow (@.claude/dockit/workflows/continue-doc.md):

1. Read .planning/STATE.md to find the current document and phase
2. Route to the appropriate phase handler
3. For Drafting: find the next incomplete section, present guiding questions, help the user write
4. For Review: present existing review results or suggest running /dockit:review
5. For Polish: present findings and help the user address them
6. Track progress in checklist.md and STATE.md throughout

Display the appropriate phase banner at the start.
</process>
