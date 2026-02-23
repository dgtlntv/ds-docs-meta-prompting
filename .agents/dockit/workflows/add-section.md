# Workflow: Add section

Adds one or more sections to an existing document. Does not continue into drafting — run `/dockit:start` afterwards to resume work.

## Prerequisites

- `.planning/STATE.md` must exist with at least one document. If it does not exist, switch to the `start.md` workflow.
- `.planning/docs/{doc-name}/structure.md` and `.planning/docs/{doc-name}/checklist.md` must exist. If they do not exist, the document has not completed the Structure phase — switch to the `start.md` workflow, which will resume from the appropriate step.

---

## Steps

<steps>

### Step 1: Identify document

Read `.planning/STATE.md`. If multiple documents exist, ask the user which document they want to add sections to.

---

### Step 2: Present available sections

Read `.planning/docs/{doc-name}/structure.md` to determine which sections the document already has. Reference `sections.md` for the full list of sections available for the document's category (construct or concept).

Present only the sections not already included. If the `AskUserQuestion` tool is available, use it with `multiselect` set to `true`.

---

### Step 3: Update files

1. Add the new sections to `.planning/docs/{doc-name}/structure.md`.
2. Add the new sections to `.planning/docs/{doc-name}/checklist.md` with status `pending`.
3. Add H2 headings for the new sections to `docs/{doc-name}.md` in the appropriate position relative to existing sections. Use the default section order from `sections.md` as a guide.
4. Update `STATE.md` to reflect the new section count.

---

### Step 4: Confirm

Tell the user which sections were added and that they can run `/dockit:start` to begin working on them.

</steps>
