---
name: dockit:start
description: Start new or continue existing design systems documentation.
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion, mcp__figma]
---

<objective>
Single entry point for all dockit work. Detects the current state and routes to the appropriate phase — starting a new document from scratch or resuming an existing one.
</objective>

<execution_context>

Workflow:
- @.claude/dockit/workflows/start.md

References:
- @.claude/dockit/references/phases.md
- @.claude/dockit/references/documentation-types.md
- @.claude/dockit/references/tiers.md
- @.claude/dockit/references/sections.md
- @.claude/dockit/references/style-guide.md

Templates:
- @.claude/dockit/templates/state.md
- @.claude/dockit/templates/structure.md
- @.claude/dockit/templates/checklist.md
- @.claude/dockit/templates/document.md
- @.claude/dockit/templates/review-report.md

Skills:
- @.claude/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the start workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
