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
- @.agents/dockit/workflows/start.md

References:
- @.agents/dockit/references/phases.md
- @.agents/dockit/references/documentation-types.md
- @.agents/dockit/references/tiers.md
- @.agents/dockit/references/sections.md
- @.agents/dockit/references/style-guide.md

Templates:
- @.agents/dockit/templates/state.md
- @.agents/dockit/templates/structure.md
- @.agents/dockit/templates/checklist.md
- @.agents/dockit/templates/document.md
- @.agents/dockit/templates/review-report.md

Skills:
- @.agents/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the start workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
