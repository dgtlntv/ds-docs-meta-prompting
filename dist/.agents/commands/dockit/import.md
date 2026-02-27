---
name: dockit:import
description: Import existing documentation into the dockit workflow. Analyzes source material, creates planning artifacts, maps content to sections, and sets up for continuation.
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion, mcp__figma]
---

<objective>
Import existing documentation — old markdown files, wiki pages, specs, or any text — into the dockit workflow. The agent analyzes the source material, infers what is being documented, maps content into the standard section structure, and creates all planning artifacts so the user can review and continue with `/dockit:start`.
</objective>

<execution_context>

Workflow:
- @.agents/dockit/workflows/import.md

References:
- @.agents/dockit/references/documentation-types.md
- @.agents/dockit/references/tiers.md
- @.agents/dockit/references/sections.md
- @.agents/dockit/references/style-guide.md

Templates:
- @.agents/dockit/templates/state.md
- @.agents/dockit/templates/structure.md
- @.agents/dockit/templates/checklist.md
- @.agents/dockit/templates/document.md
- @.agents/dockit/templates/import-report.md

Skills:
- @.agents/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the import workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
