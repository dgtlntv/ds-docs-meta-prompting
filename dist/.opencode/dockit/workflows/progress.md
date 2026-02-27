# Workflow: Progress

Displays a summary of documentation progress across all documents.

---

## Steps

<steps>

### Step 1: Check state

Check whether `.planning/STATE.md` exists. If it does not, inform the user that no documentation is in progress and suggest running `/dockit:start`.

---

### Step 2: Read document status

Read `.planning/STATE.md` to get the list of all documents and their phases.

---

### Step 3: Read section status

For each document, read `.planning/docs/{doc-name}/checklist.md` to get the per-section state breakdown.

---

### Step 4: Read review findings

For each document in `Review` or `Complete` phase, check whether `.planning/reviews/{doc-name}-review.md` exists. If it does, read the finding counts and resolution status.

---

### Step 5: Present summary

Present a summary for each document:

```
Document: {doc-name}
  Type: {documentation-type}
  Tier: {tier}
  Phase: {phase}
  Sections:
    - {section-name}: {state}
    - {section-name}: {state}
  Progress: {complete}/{total} complete
  Review: {resolved}/{total} findings resolved (if applicable)
```

If multiple documents exist, present them in order.

</steps>
