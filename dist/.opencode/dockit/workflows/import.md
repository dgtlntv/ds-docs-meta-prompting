# Workflow: Import

Import existing documentation into the dockit workflow. Analyzes source material, creates all planning artifacts, maps content into sections, and sets up the document for the user to review and continue.

---

## Prerequisites

- `.planning/STATE.md` must **not** exist. If it does, inform the user that a document is already in progress and suggest they use `/dockit:start` to continue it. If they want to import into a fresh workspace, they should resolve or archive the existing document first.

---

## Steps

<steps>

### Step 1: Gather source material

Ask the user for their existing documentation. Accept any combination of:

- File paths (the agent reads them)
- Pasted text
- URLs (if accessible)

Read all provided material. If the material is very large, summarize each source briefly to confirm with the user that everything was captured.

---

### Step 2: Analyze and classify

Read all source material carefully. Infer the following:

- **Name** — what is this documentation about?
- **Category** — construct or concept? Reference @.opencode/dockit/references/documentation-types.md.
- **Type** — which specific type within the category? Reference @.opencode/dockit/references/documentation-types.md.
- **Tier** — where is this used? Reference @.opencode/dockit/references/tiers.md.
- **Primary consumers** — who is this documentation for?
- **Key use cases / questions answered** — what does this documentation help people do or understand?
- **Benchmarking notes** — does the source material reference other design systems or external patterns?

**Multi-document check:**

If the source material appears to cover multiple distinct topics that would each warrant their own document (e.g. a wiki dump covering both a Button component and a Form pattern), flag this to the user. Recommend which topic to focus on for this import and suggest the others be imported separately. Do not attempt to create multiple documents in a single import. Proceed with the single document the user confirms.

---

### Step 3: Map content to sections

Reference @.opencode/dockit/references/sections.md for the section taxonomy matching the inferred category (construct or concept).

For each section in the taxonomy:

1. Search the source material for content that belongs in this section.
2. If content exists, mark the section for inclusion and note which source material maps to it.
3. If no content exists but the section is important for this documentation type, mark it for inclusion as a gap.

Also identify any source content that does not map to any known section — this is unmapped content that the user should be made aware of.

---

### Step 4: Assess section states

For each section that has mapped content, assign a state:

- **`draft`** — content exists. Use the notes column in the checklist to add nuance:
  - If the content is rough, unstructured, or clearly a brain dump, note: "Imported — rough, needs significant revision"
  - If the content is reasonably complete but does not match the style guide, note: "Imported — solid content, needs revision for voice and style"
  - If the content is incomplete and only partially covers the section, note: "Imported — partial, covers {X} but missing {Y}"

- **`pending`** — no source content maps to this section. Note: "No source content — needs drafting from scratch"

Never assign a state above `draft`. All imported content must go through revision (Phase 4) before it can reach `revised`.

---

### Step 5: Create artifacts

Create the planning directory and all standard artifacts:

```
.planning/
├── STATE.md
├── reviews/
└── docs/
    └── {doc-name}/
        ├── structure.md
        ├── checklist.md
        └── import-report.md
```

1. **`.planning/STATE.md`** — following @.opencode/dockit/templates/state.md. Set phase to `In progress`. Populate discovery fields with the inferred values from Step 2. In the "Existing resources" field, list the source material provided by the user.

2. **`.planning/docs/{doc-name}/structure.md`** — following @.opencode/dockit/templates/structure.md. Include all sections identified in Step 3 (both those with content and those marked as gaps). Add a note in the Notes section: "Structure inferred from imported source material."

3. **`.planning/docs/{doc-name}/checklist.md`** — following @.opencode/dockit/templates/checklist.md. Each section gets the state assigned in Step 4. The notes column carries the assessment detail.

4. **`docs/{doc-name}.md`** — following @.opencode/dockit/templates/document.md. For `draft` sections, place the mapped source content as-is under the appropriate heading. Do not rewrite, restructure, or edit the content — copy it exactly as it appeared in the source material. For `pending` sections, leave the heading with no content.

5. **`.planning/docs/{doc-name}/import-report.md`** — following @.opencode/dockit/templates/import-report.md. This is the paper trail of all mapping decisions. Fill in every section of the report.

---

### Step 6: Redundancy check

Ask the user (with the `AskUserQuestion` tool if available) whether a `dockit-overlap-reviewer` agent should be spawned to check for overlap with existing documentation.

- If the user agrees, spawn a `dockit-overlap-reviewer` agent with the inferred discovery answers and the mapped section list as context.
- The `dockit-overlap-reviewer` should distinguish between three outcomes:
  - **Duplicate** — the imported document covers the same ground as an existing document (same topic, same aspects, same audience). This is true overlap and the user should disambiguate or reconsider.
  - **Complementary** — an existing document covers the same topic, but the imported material addresses different aspects, a different angle, or different sections. This is not a conflict — inform the user what already exists so they can reference or link to it, but do not discourage them from proceeding. This is a common and expected outcome when importing, since the user is often adding to an already-documented topic.
  - **No overlap** — no existing documentation covers this topic.
- If the outcome is **duplicate**, inform the user and ask whether they want to adjust the document's name, scope, or type — or merge with the existing document.
- If the outcome is **complementary**, inform the user what already exists and suggest they consider how the imported document relates to it. Encourage them to continue.
- If the user makes changes, update `STATE.md`, `structure.md`, and the import report accordingly. Offer another redundancy check if the changes were significant.
- Continue until there is no duplicate overlap, or the user declines further review.

---

### Step 7: Present import summary

Present a structured summary to the user covering:

1. **What was inferred** — the discovery answers (name, category, type, tier, audience, use cases). Ask the user to confirm or correct each.

2. **How content was mapped** — which sections have content (`draft`) and which are empty (`pending`). For each `draft` section, briefly describe what content was placed and any nuance from the notes.

3. **What could not be placed** — any unmapped source content. Ask the user whether to discard it, assign it to a section, or save it for later.

4. **What is missing** — the `pending` sections and any thin areas within `draft` sections. Frame these as what the user should focus on when continuing.

5. **Multi-document flag** — if flagged in Step 2, remind the user about the other potential documents.

Ask the user to review everything and make adjustments. Update artifacts based on their feedback. This is an interactive step — cycle through adjustments until the user confirms they are satisfied.

---

### Step 8: Handoff

Once the user confirms the import:

1. Tell the user that the import is complete and the document is set up for continuation.
2. Summarize the next steps — how many sections are `draft` (need revision), how many are `pending` (need drafting from scratch), and what the recommended next action is.
3. Tell the user to run `/dockit:start` to begin working on the document.

</steps>
