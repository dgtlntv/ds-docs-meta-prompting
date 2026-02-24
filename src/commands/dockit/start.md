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
- @{AGENT_FOLDER}/dockit/workflows/start.md

References:
- @{AGENT_FOLDER}/dockit/references/phases.md
- @{AGENT_FOLDER}/dockit/references/documentation-types.md
- @{AGENT_FOLDER}/dockit/references/tiers.md
- @{AGENT_FOLDER}/dockit/references/sections.md
- @{AGENT_FOLDER}/dockit/references/style-guide.md

Templates:
- @{AGENT_FOLDER}/dockit/templates/state.md
- @{AGENT_FOLDER}/dockit/templates/structure.md
- @{AGENT_FOLDER}/dockit/templates/checklist.md
- @{AGENT_FOLDER}/dockit/templates/document.md
- @{AGENT_FOLDER}/dockit/templates/review-report.md

Skills:
- @{AGENT_FOLDER}/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the start workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
