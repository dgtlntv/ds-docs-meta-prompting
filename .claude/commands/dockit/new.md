---
name: dockit:new
description: "Start new design systems documentation"
allowed-tools: [Read, Write, Edit, Glob, Grep, AskUserQuestion, mcp__figma]
---

<objective>
Guide the user through creating a new design systems document, from discovery through structure setup.
</objective>

<execution_context>
References:
- @.claude/dockit/workflows/new-doc.md
- @.claude/dockit/references/questioning.md
- @.claude/dockit/references/phases.md
- @.claude/dockit/references/section-checklists.md
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-questioner.md

- @.claude/dockit/templates/state.md
- @.claude/dockit/templates/structure.md
- @.claude/dockit/templates/checklist.md
- @.claude/skills/figma-context.md
</execution_context>

<process>
Follow the new-doc workflow (@.claude/dockit/workflows/new-doc.md) step by step:

1. Initialize the .planning/ directory if needed
2. Ask the user what type of document they're creating (component, pattern, foundation, content guideline, accessibility standard)
3. Run discovery questions following the questioner agent's approach
4. Write STATE.md with discovery answers
5. Present the section checklist for the chosen doc type
6. Let the user select, reorder, and add sections
7. Create structure.md, checklist.md, and the empty doc file
8. Update STATE.md to Drafting phase
9. Prompt: run /dockit:continue to start writing

Display the phase banner at the start:
━━━ dockit ► DISCOVERY ━━━
</process>
