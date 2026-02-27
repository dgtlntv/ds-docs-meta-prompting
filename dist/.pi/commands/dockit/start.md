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
- @.pi/dockit/workflows/start.md

References:
- @.pi/dockit/references/phases.md
- @.pi/dockit/references/documentation-types.md
- @.pi/dockit/references/tiers.md
- @.pi/dockit/references/sections.md
- @.pi/dockit/references/style-guide.md

Templates:
- @.pi/dockit/templates/state.md
- @.pi/dockit/templates/structure.md
- @.pi/dockit/templates/checklist.md
- @.pi/dockit/templates/document.md
- @.pi/dockit/templates/review-report.md

Skills:
- @.pi/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the start workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
