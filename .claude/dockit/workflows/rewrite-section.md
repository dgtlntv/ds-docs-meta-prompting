# Workflow: Rewrite Section

TODO: This one should actually be more handson in dpoing the rewrite. this is the only place where the agent should be more hands on

Step-by-step orchestration for helping the user rewrite a specific section of their documentation.

## Prerequisites

- `docs/{doc-name}.md` must exist with content
- The user specifies which section to rewrite (or we identify it from review findings)

## Steps

### Step 1: Identify Section

Determine which section to rewrite:

- If the user specified a section name as an argument, use that
- If not, read `.planning/STATE.md` to find the current document, then ask which section

TODO: use the ask questions tool, potentially multiselect

Read the section content from `docs/{doc-name}.md`.

### Step 2: Gather Context

Read relevant context:

1. **Current text**: The section as it exists now
2. **Style guide**: Read `.claude/dockit/style-guide.md` (for voice reference)
3. **Review findings**: Read `.planning/reviews/{doc-name}-review.md` if it exists, filter for findings related to this section
4. **Section definition**: Read the section's purpose from @.claude/dockit/references/section-checklists.md

### Step 3: Present the Situation

```
━━━ dockit ► REWRITE ━━━

Section: {section-name}
Document: {doc-name}
```

Show:

1. The current text of the section
2. Any review findings for this section (from all reviewers)
3. What this section should typically cover

### Step 4: Suggest Alternatives

Based on the review findings and section purpose, suggest 1-2 **approaches** (not full rewrites):

- "One approach: break this into shorter sentences and lead with the primary use case"
- "Another approach: restructure around the three variants you mentioned, giving each its own subsection"

These are structural suggestions, not written content. The user writes.

### Step 5: User Rewrites

Wait for the user to write their revised version. They can:

- Write a completely new version
- Modify the existing text
- Ask for more specific guidance on a particular aspect

If they ask for guidance, provide it through questions (following @.claude/dockit/references/questioning.md), not by writing content.

### Step 6: Quick Review

After the user writes the new version:

1. Briefly check if the review findings are addressed
2. Check if the section still meets its completeness criteria
3. Note any improvements or remaining issues
4. Ask: "Does this feel right, or would you like to adjust further?"

### Step 7: Apply and Update

When the user confirms:

1. Write the new content to the section in `docs/{doc-name}.md`
2. If a review report exists, update the relevant findings in `.planning/reviews/{doc-name}-review.md` to `rewritten`
3. Display confirmation:

```
━━━
Updated: {section-name} in docs/{doc-name}.md
{count} review finding(s) addressed

Next steps:
  /dockit:continue — Continue with other sections
  /dockit:review — Re-run review to verify changes
  /dockit:rewrite {other-section} — Rewrite another section
━━━
```
