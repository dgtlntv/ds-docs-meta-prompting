---
name: dockit:add-section
description: Add one or more sections to an existing document.
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion]
---

<objective>
Add new sections to a document that has already completed the Structure phase. Does not continue into drafting — run `/dockit:start` afterwards to resume work.
</objective>

<execution_context>

Workflow:
- @.claude/dockit/workflows/add-section.md

References:
- @.claude/dockit/references/sections.md

</execution_context>

<process>
Follow the add-section workflow step by step. Read each referenced file as needed — do not rely on prior knowledge of their contents.
</process>
