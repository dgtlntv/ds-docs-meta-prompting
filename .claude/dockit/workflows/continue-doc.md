# Workflow: Continue Documentation

Step-by-step orchestration for resuming work on an in-progress document.

## Prerequisites

- `.planning/STATE.md` must exist
- At least one document must be in progress

TODO: should probably say what to do if no STATE.md exists

## Steps

### Step 1: Read State

Read `.planning/STATE.md` to determine:

- Which document(s) are in progress
- Current phase for each document
- Current progress

If multiple documents exist and it's ambiguous which one to continue, ask the user which document they want to work on.

### Step 2: Route by Phase

**If phase is `Discovery`**:

- The user started `/dockit:new` but didn't finish discovery
- Resume asking discovery questions from where they left off
- Follow the new-doc workflow from the appropriate step
  - TODO: DO we need to reference file?

**If phase is `Structure`**:

- Discovery is done but sections haven't been selected yet
- Resume the section selection from the new-doc workflow Step 5
  - TODO: DO we need to reference file?

**If phase is `Drafting`**:

- Proceed to Step 3 below

**If phase is `Review`**:

- Review results should already exist. Present them and enter Polish phase.
- If no review report exists, suggest running `/dockit:review`

**If phase is `Polish`**:

- Present the review report and resume addressing findings
- Follow the review-cycle workflow's polish steps

### Step 3: Find Next Section (Drafting Phase)

Read `.planning/docs/{doc-name}/checklist.md` to find the first section with status `pending` or `in-progress`.

Display progress banner:

```
━━━ dockit ► DRAFTING ━━━

Document: {doc-name}
Progress: {complete}/{total} sections complete
```

### Step 4: Present Section for Drafting

For the current section, following the dockit-questioner behavior (@.claude/agents/dockit-questioner.md):

1. **Explain** what this section typically covers (from @.claude/dockit/references/section-checklists.md) — without writing it
2. If a Figma URL is recorded in STATE.md and the section would benefit from design context (anatomy, variants, props, states), use the Figma MCP tools (@.claude/skills/figma-context.md) to pull relevant information and present a brief summary
3. **Ask** 2-3 guiding questions specific to that section — informed by Figma context when available
4. **Wait** for the user to write the content

Display format:

```
Section: {section-name} ({n}/{total})

{explanation of what this section covers}

Questions to consider:
  1. {guiding question}
  2. {guiding question}
  3. {guiding question}
```

### Step 5: Review User's Content

After the user writes content for a section:

1. Read what they wrote
2. Check against the section's completeness criteria (from @.claude/dockit/references/section-checklists.md)
3. If something is typically covered but missing, mention it: "Have you considered X?" or "This section typically also covers Y"
4. Ask: "Are you happy with this section, or would you like to add more?"

Do NOT write content for them. Only ask if they've considered additional aspects.

### Step 6: Mark Section Complete

When the user confirms a section is done:

1. Update `.planning/docs/{doc-name}/checklist.md` — set section status to `complete`
2. Update `.planning/STATE.md` — increment progress count
3. Write the user's content to the appropriate section in `docs/{doc-name}.md`

### Step 7: Advance or Prompt

If there are more sections:

- Return to Step 3 to present the next section
- Show: "Moving to next section: {name} ({n}/{total})"

If all sections are complete:

- Update `.planning/STATE.md` — set phase to `Review`
- Display:

```
━━━ dockit ► DRAFTING COMPLETE ━━━

All {total} sections complete for {doc-name}.

━━━
Next: Run /dockit:review to check your documentation
━━━
```

TODO: Are we referencing the references here properly? like questioning etc.
