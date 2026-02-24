# Documentation Phases

The 6 phases of the dockit workflow, their transitions, and artifacts.

## Overview

```
Discovery → Structure → Vomit drafting → Revision → Review → Polish
```

Each phase produces specific artifacts and has clear entry and exit criteria.

Phases 1 (Discovery) and 2 (Structure) operate at the **document level** — they apply to the document as a whole.

Phases 3 (Vomit drafting) through 6 (Polish) operate at the **section level** — each section progresses through these phases independently. A user can vomit-draft the Usage section on one day and the Anatomy section on another. They are not forced to complete all sections in a phase before moving any section forward.

---

<phases>

## Phase 1: Discovery

<purpose>
Understand what is being documented and for whom.
</purpose>

<entry>
User runs `/dockit:start` with no existing `.planning/STATE.md`.
</entry>

<activities>

- Identify the name of the construct or concept
- Identify the documentation type — reference @./documentation-types.md for the available types
- Identify the tier — reference @./tiers.md for the available tiers
- Gather existing specs, designs, or prior documentation — ask what the user wants to keep from any old documentation
- Identify the primary consumers of this documentation (designers, developers, content writers)
- If it is a **construct**:
  - Understand key use cases — in what situations would this construct be used? What problems does it solve?
  - Are there specific user groups served by this construct? What problems does it solve for them?
- If it is a **concept**:
  - How does it help people understand the design system or use it better?
  - Of the primary consumers, what questions does this concept answer for them?
- Ask whether the user has done benchmarking of other design systems:
  - What did they learn? What do other design systems do well regarding this topic?
  - Is there anything from the benchmarking they want to keep in mind when writing?

**Redundancy check loop:**

After the user has answered all discovery questions, ask (with the `AskUserQuestion` tool if available) whether a `dockit-overlap-reviewer` agent should be spawned to check for overlap with existing documentation.

- If the user agrees, spawn a `dockit-overlap-reviewer` agent with the discovery answers as context
- If the `dockit-overlap-reviewer` concludes there is overlap (in naming, intended use case, or scope), inform the user and ask whether they want to disambiguate
- If the user changes their answers based on the review, ask whether they want to spawn another `dockit-overlap-reviewer` with the updated answers
- Continue this loop until the `dockit-overlap-reviewer` concludes there is no overlap, or the user declines further review

</activities>

<artifacts>
- `.planning/STATE.md` — populated with discovery answers, following @../templates/state.md
</artifacts>

<exit_criteria>
The user has answered all discovery questions and confirmed the documentation type, tier, and audience. The redundancy check loop has been offered and — if accepted — has concluded with no remaining overlap, or the user has declined further review.
</exit_criteria>

<transition>
Automatic — moves to Structure after discovery is complete.
</transition>

---

## Phase 2: Structure

<purpose>
Define what sections the documentation will contain and in what order.
</purpose>

<entry>
Discovery phase complete. Or user runs `/dockit:add-section` to add sections to an existing document.
</entry>

<activities>

- Present the section checklist for the chosen documentation type — reference @./sections.md
- The user selects which sections they want to include — this is a free choice, not all sections are required
- If the `AskUserQuestion` tool is available, use it with `multiselect` set to `true`

</activities>

<artifacts>
- `.planning/docs/{doc-name}/structure.md` — following @../templates/structure.md
- `.planning/docs/{doc-name}/checklist.md` — following @../templates/checklist.md
- `docs/{doc-name}.md` — following @../templates/document.md
</artifacts>

<exit_criteria>
The user has confirmed the section list and order.
</exit_criteria>

<transition>
Prompt the user to run `/dockit:start` to begin drafting.
</transition>

---

## Phase 3: Vomit drafting

<purpose>
Help the user write a raw first pass of a section's content — quickly, without self-criticism.
</purpose>

<mindset>
A vomit draft is an unedited first pass written as fast as possible to get ideas onto the page. The point is not to write badly — it is to allow yourself to write badly. Explain this mindset to the user when they enter this phase for the first time.
</mindset>

<entry>
User runs `/dockit:start` and selects a section in `pending` state to work on.
</entry>

<activities>

Before starting, check whether this section has been sent back from Phase 6 (Polish). A section that was sent back to drafting has prior context that must inform this pass:

- Check `.planning/reviews/{doc-name}-review.md` for findings related to this section
- Check `docs/{doc-name}.md` for any previous content the section had before being reset
- Present the relevant review findings and the previous content to the user so they understand why the section was sent back and what needs to change
- Use this context to guide the conversation — the guiding questions still apply, but focus on the areas the review findings identified as needing rethinking

For a section entering this phase for the first time (no prior review context):

1. Explain what the section typically covers — without writing content for the user
2. Ask the guiding questions for that section (from @./sections.md)
3. The user writes the content
4. Gently check coverage: "Have you considered X?" / "This section typically also covers Y" — do not critique quality, only check that the most important substance is present
5. Mark the section as `draft` in the checklist

After completing a section, ask the user whether they want to:

- Continue vomit-drafting another `pending` section
- Move a `draft` section forward to revision
- Stop for now

</activities>

<artifacts>
- `docs/{doc-name}.md` — updated with user-written content for the section
- `.planning/docs/{doc-name}/checklist.md` — section marked as `draft`
</artifacts>

<exit_criteria>
The selected section has content and is marked as `draft`.
</exit_criteria>

<transition>
The user chooses what to do next — draft another section, revise a drafted section, or stop. There is no requirement to draft all sections before revising any.
</transition>

---

## Phase 4: Revision

<purpose>
Turn the vomit draft of a section into readable prose. The substance the user provided is rewritten to follow the style guide — the agent does not invent new content.
</purpose>

<entry>
User runs `/dockit:start` and selects a section in `draft` state to revise.
</entry>

<activities>

Before starting, check whether this section has been sent back from Phase 6 (Polish). A section that was sent back to revision has review findings that must inform the rewrite:

- Check `.planning/reviews/{doc-name}-review.md` for findings related to this section
- Pass these findings to the revision agent as additional context alongside the vomit draft, so the revision addresses the specific issues raised in the review
- Present the findings to the user as well, so they can guide the revision with full awareness of what was flagged

For the selected section:

1. Spawn a revision agent to rewrite the vomit draft into readable prose that follows the style guide — include any review findings as context if this is a send-back
2. Present the revised version to the user
3. If the user is happy with the revision, merge it into the document and mark the section as `revised`
4. If the user requests changes, implement them and present the updated version
5. If the user fully disagrees with the revision, ask for their input and spawn a new revision agent with the user's feedback as additional context — repeat until the user is satisfied

After completing a section, ask the user whether they want to:

- Revise another `draft` section
- Continue vomit-drafting a `pending` section
- Stop for now

When multiple sections are in `draft` state, up to 4 revision agents can run in parallel if the user wants to revise several sections at once.

</activities>

<artifacts>
- `docs/{doc-name}.md` — updated with revised content for the section
- `.planning/docs/{doc-name}/checklist.md` — section marked as `revised`
</artifacts>

<exit_criteria>
The selected section has been revised into readable prose and is marked as `revised`.
</exit_criteria>

<transition>
The user chooses what to do next — revise another section, draft a pending section, or move to review when all sections are `revised`. Prompt the user to run `/dockit:review` once every section has reached `revised` state. The `/dockit:start` workflow handles this routing automatically.
</transition>

---

## Phase 5: Review

<purpose>
Evaluate the completed documentation against quality standards.
</purpose>

<entry>
User runs `/dockit:review` (or individual check commands). All sections must be in `revised` state before a full review can run.
</entry>

<activities>

Spawn review agents (up to 4 in parallel):

1. **Voice reviewer** — checks against the style guide at @./style-guide.md
2. **Readability reviewer** — Flesch-Kincaid scoring and qualitative analysis
3. **Completeness reviewer** — section coverage verification
4. **Copy editor** — grammar, spelling, and formatting

Collect and merge results into a consolidated review report.

</activities>

<artifacts>
- `.planning/reviews/{doc-name}-review.md` — following @../templates/review-report.md
</artifacts>

<exit_criteria>
All enabled reviewers have completed their review and findings are presented.
</exit_criteria>

<transition>
Automatic — moves to Polish after review results are presented.
</transition>

---

## Phase 6: Polish

<purpose>
Address review findings and finalise the documentation.
</purpose>

<entry>
Review phase complete, findings presented.
</entry>

<activities>

For each finding, the user decides how to handle it:

- **Skip** — the finding is acknowledged but not acted on. Mark the finding as `skipped` in the review report.
- **Fix now** — ask the user whether they want to:
  - Fix it manually — wait for the user to make changes and send a "continue" prompt before proceeding to the next finding. Tell the user you are waiting.
  - Provide instructions for the agent to implement — implement the fix and present it for confirmation.
- **Send back to drafting** — move the section back to `pending` state. The user re-enters Phase 3 (Vomit drafting) for that section. From there it progresses through Phase 4 (Revision) again before returning to review. This is appropriate when the finding reveals that the section's substance needs rethinking, not just surface-level fixes.
- **Send back to revision** — move the section back to `draft` state. The user re-enters Phase 4 (Revision) for that section with the finding as additional context for the revision agent. This is appropriate when the prose needs significant rewriting but the underlying substance is sound.

When a section is sent back to an earlier phase, only that section is affected. All other sections remain in their current state. The document cannot be marked as complete until every section has returned to `revised` state and all findings are resolved.

</activities>

<artifacts>
- `docs/{doc-name}.md` — updated with fixes
- `.planning/reviews/{doc-name}-review.md` — updated with resolution status for each finding
- `.planning/docs/{doc-name}/checklist.md` — sections sent back updated to their new phase state
</artifacts>

<exit_criteria>
The user has addressed every finding (skip, fix, send back to drafting, or send back to revision) and is satisfied with the result. All sections are in `revised` state with no unresolved findings.
</exit_criteria>

<transition>
Documentation is complete. `STATE.md` updated to reflect finished status.
</transition>

</phases>

---

## Section phase tracking

Each section in a document has its own phase state, tracked in the checklist. The document-level phase in `STATE.md` reflects the overall progress.

<section_states>

### Possible section states

- `pending` — section has been selected in Structure but has no content yet
- `draft` — section has a vomit draft written by the user
- `revised` — section has been rewritten into readable prose
- `in-review` — section is part of an active review cycle
- `complete` — section has passed review with all findings resolved

### State transitions

```
pending → draft → revised → in-review → complete
                     ↑          │
                     │          ├── (send back to revision) → draft
                     │          │
                     │          └── (send back to drafting) → pending
                     │
                     └── (send back from polish) → draft or pending
```

A section can only move forward one phase at a time during normal progression. It can be sent back to `pending` or `draft` from Polish (Phase 6) based on the nature of the finding.

</section_states>

---

## Phase tracking in STATE.md

`STATE.md` tracks both the document-level status and per-section progress. See @../templates/state.md for the full structure.

Document-level phase values: `Discovery`, `Structure`, `In progress`, `Review`, `Complete`

The document-level phase is `In progress` whenever sections are in a mix of `pending`, `draft`, and `revised` states. It moves to `Review` when all sections reach `revised` and a review is initiated. It returns to `In progress` if any section is sent back during Polish. It reaches `Complete` when all sections are `complete`.
