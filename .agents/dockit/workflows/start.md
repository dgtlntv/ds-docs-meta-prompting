# Workflow: Start

Single entry point for all dockit work. Detects the current state and routes to the appropriate phase.

---

## Steps

<steps>

### Step 1: Check state

Check whether `.planning/STATE.md` exists.

- If it does not exist, go to Step 2.
- If it exists, read it and go to Step 3.

---

### Step 2: New document

No state exists — start from scratch.

1. Create the planning directory:

```
.planning/
├── STATE.md
├── reviews/
└── docs/
```

2. Run Phase 1 (Discovery) as described in `phases.md`. Use `documentation-types.md` for the type taxonomy and `tiers.md` for tier selection. If the user provides a Figma URL or mentions existing designs, use the `figma-context` skill.
3. Populate `.planning/STATE.md` following the template in `templates/state.md`. Set the phase to `Structure`.
4. Run Phase 2 (Structure) as described in `phases.md`. Use `sections.md` for the available sections.
5. Create `.planning/docs/{doc-name}/structure.md` following the template in `templates/structure.md`.
6. Create `.planning/docs/{doc-name}/checklist.md` following the template in `templates/checklist.md`.
7. Create `docs/{doc-name}.md` following the template in `templates/document.md`.
8. Update `STATE.md` phase to `In progress`. Confirm that structure is complete and tell the user to run `/dockit:start` to begin writing content.

---

### Step 3: Route by state

Read the document phase and section states from `STATE.md`. If multiple documents exist and it is ambiguous which one to continue, ask the user which document they want to work on.

Route based on the document phase:

- **Discovery** or **Structure** — resume Step 2 from the appropriate sub-step.
- **In progress** — go to Step 4.
- **Review** — if a review report exists at `.planning/reviews/{doc-name}-review.md`, present the findings and enter Phase 6 (Polish) as described in `phases.md`. If no review report exists, prompt the user to run `/dockit:review`.
- **Complete** — inform the user the document is finished. Ask whether they want to start a new document. If yes, go to Step 2.

---

### Step 4: Resume section work

Read `.planning/docs/{doc-name}/checklist.md` to determine the state of each section. Present the current progress to the user.

Suggest the most productive next action based on the section states, but let the user choose. The available options depend on what states exist in the checklist:

- If there are `pending` sections — offer to vomit-draft one. Follow Phase 3 (Vomit drafting) in `phases.md`. Use `sections.md` for the guiding questions. If a Figma URL is recorded in `STATE.md` and the section would benefit from design context, use the `figma-context` skill.
- If there are `draft` sections — offer to revise one. Follow Phase 4 (Revision) in `phases.md`. Use `style-guide.md` for the revision target.
- If all sections are `revised` — prompt the user to run `/dockit:review` to start Phase 5.

When suggesting, prioritise finishing in-progress work over starting new work. For example, if there are both `pending` and `draft` sections, suggest revising a draft first — but let the user draft a new section instead if they prefer.

After completing work on a section, update `.planning/docs/{doc-name}/checklist.md` and `STATE.md` to reflect the new section state. Return to the start of this step.

</steps>
