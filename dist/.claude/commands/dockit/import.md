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
- @.claude/dockit/workflows/import.md

References:
- @.claude/dockit/references/documentation-types.md
- @.claude/dockit/references/tiers.md
- @.claude/dockit/references/sections.md
- @.claude/dockit/references/style-guide.md

Templates:
- @.claude/dockit/templates/state.md
- @.claude/dockit/templates/structure.md
- @.claude/dockit/templates/checklist.md
- @.claude/dockit/templates/document.md
- @.claude/dockit/templates/import-report.md

Skills:
- @.claude/skills/figma-context/SKILL.md

</execution_context>

<process>
Follow the import workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
