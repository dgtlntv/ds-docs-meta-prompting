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
- @.opencode/dockit/workflows/start.md

References:
- @.opencode/dockit/references/phases.md
- @.opencode/dockit/references/documentation-types.md
- @.opencode/dockit/references/tiers.md
- @.opencode/dockit/references/sections.md
- @.opencode/dockit/references/style-guide.md

Templates:
- @.opencode/dockit/templates/state.md
- @.opencode/dockit/templates/structure.md
- @.opencode/dockit/templates/checklist.md
- @.opencode/dockit/templates/document.md
- @.opencode/dockit/templates/review-report.md

Skills:
- @.opencode/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the start workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
