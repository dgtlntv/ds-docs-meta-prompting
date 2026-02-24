# Workflow: Review

Runs all review agents against a document and presents consolidated findings. Covers Phase 5 (Review) and Phase 6 (Polish) from `phases.md`.

## Prerequisites

- `.planning/STATE.md` must exist with at least one document where all sections are in `revised` state. If not, inform the user and suggest running `/dockit:start` to finish outstanding sections first.

---

## Steps

<steps>

### Step 1: Identify document

Read `.planning/STATE.md`. If multiple documents exist, ask the user which document they want to review.

Verify that all sections in `.planning/docs/{doc-name}/checklist.md` are in `revised` state. If any sections are in `pending` or `draft` state, inform the user which sections are not ready and suggest running `/dockit:start` to complete them.

---

### Step 2: Run reviewers

Spawn up to 4 review agents in parallel, each using its corresponding skill:

1. **Voice reviewer** — uses the `brand-voice-evaluation` skill and `style-guide.md`
2. **Readability reviewer** — uses the `readability-evaluation` skill
3. **Completeness reviewer** — uses the `completeness-evaluation` skill and `sections.md`
4. **Copy editor** — uses the `copy-editing-evaluation` skill

---

### Step 3: Consolidate findings

Collect results from all reviewers and merge them into a single review report. Write the report to `.planning/reviews/{doc-name}-review.md`, following the template in `templates/review-report.md`.

Update `.planning/STATE.md` to set the document phase to `Review`.

---

### Step 4: Present findings

Present the consolidated findings to the user, grouped by severity.

---

### Step 5: Polish

Enter Phase 6 (Polish) as described in `phases.md`. For each finding, the user decides how to handle it: skip, fix now, send back to drafting, or send back to revision.

After all findings are resolved, update `STATE.md` to reflect the final document phase.

</steps>
