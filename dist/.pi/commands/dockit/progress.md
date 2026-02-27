---
name: dockit:progress
description: Show documentation progress across all documents.
allowed-tools: [Read, Glob]
---

<objective>
Read STATE.md and all checklists to present a comprehensive progress summary.
</objective>

<execution_context>

Workflow:
- @.pi/dockit/workflows/progress.md

</execution_context>

<process>
Follow the progress workflow step by step. Read each file as needed — do not rely on prior knowledge of their contents.
</process>
