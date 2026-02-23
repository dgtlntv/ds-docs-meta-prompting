# Workflow: New Documentation

Step-by-step orchestration for starting a new design systems document.

## Prerequisites

- None — this is the entry point.

## Steps

### Step 1: Initialize Planning Directory

Check if `.planning/` exists. If not, create it:

```
.planning/
├── STATE.md        (will be populated in Step 4)
├── reviews/
└── docs/
```

If `.planning/` already exists, read `STATE.md` to check if there's work in progress. If so, ask the user if they want to start a new doc or continue the existing one.

### Step 2: Discovery — Doc Type

TODO: This seems like a repitition from other files. Should probably be cleaned up

Ask the user what type of documentation they're creating:

1. **Component** — A UI component (button, modal, input, etc.)
2. **Pattern** — A recurring design pattern (form layout, empty state, loading, etc.)
3. **Foundation** — A design foundation (color, typography, spacing, etc.)
4. **Content guideline** — Content rules for a specific area (error messages, labels, etc.)
5. **Accessibility standard** — An accessibility requirement (focus management, contrast, etc.)

Use AskUserQuestion with these as options.

### Step 3: Discovery — Details

Following the dockit-questioner agent's behavior (@.claude/agents/dockit-questioner.md) and questioning reference (@.claude/dockit/references/questioning.md), ask discovery questions:

1. **Name**: "What's the name of this {doc-type}?"
2. **Purpose**: "In a sentence or two, what does this {doc-type} do and why does your design system need it?"
3. **Audience**: "Who are the primary consumers of this documentation? Designers, developers, content writers — or a mix?"
4. **Existing resources**: "Do you have any existing specs, designs, Figma files, or prior documentation for this?"
5. **Key use cases**: "What are the 2-3 most important use cases or scenarios for this {doc-type}?"

Ask these conversationally, not as a checklist. Follow the user's energy — if they give detailed answers, dig deeper; if short, note it and move on.

If the user provides a Figma URL or mentions existing Figma designs, use the Figma MCP tools (@.claude/skills/figma-context.md) to pull context. Summarize what you find and ask informed follow-up questions. Record the Figma URL in STATE.md so it's available during later phases.

### Step 4: Write STATE.md

Create `.planning/STATE.md` using the template (@.claude/dockit/templates/state.md) populated with discovery answers. Include:

- Document name
- Doc type
- Phase: `Structure`
- Discovery answers (purpose, audience, resources, use cases)

If STATE.md already exists with other documents, append this new document to the Documents table.

### Step 5: Structure — Present Section Checklist

Based on the doc type, present the relevant section checklist from @.claude/dockit/references/section-checklists.md.

Display all available sections for the doc type with a brief description of what each covers. Then ask the user:

1. "Which of these sections do you want to include?"
2. "Would you like to reorder them?"

TODO: Use the AskUserQuestion tool with multiselect set to true with the options

### Step 6: Write Structure Files

Create `.planning/docs/{doc-name}/structure.md` using the template (@.claude/dockit/templates/structure.md) with:

- Doc type
- Chosen sections in order
- Notes from the conversation

Create `.planning/docs/{doc-name}/checklist.md` using the template (@.claude/dockit/templates/checklist.md) with:

- All chosen sections listed as `pending`
- Summary counts

### Step 7: Create Empty Doc File

Create `docs/{doc-name}.md` with:

- H1 title (the document name)
- H2 headings for each chosen section (in order)
- No content under the headings — that's for the drafting phase

### Step 8: Update STATE.md

Update the phase to `Drafting` and set progress to `0/{total} sections complete`.

### Step 9: Present Next Steps

Display using @.claude/dockit/references/ui-formatting.md format:

```
━━━ dockit ► STRUCTURE COMPLETE ━━━

Created: docs/{doc-name}.md with {count} sections
State: .planning/STATE.md updated

━━━
Next: Run /dockit:continue to start writing content
━━━
```
