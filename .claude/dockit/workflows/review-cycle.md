# Workflow: Review Cycle

Step-by-step orchestration for running the full review cycle with all enabled reviewers.

## Prerequisites

- `.planning/STATE.md` must exist with a document in `Review` phase (or `Drafting` if user wants early feedback)
- `docs/{doc-name}.md` must exist with content to review

TODO: what to do if prerequsists not met

## Steps

### Step 1: Identify Document

Read `.planning/STATE.md` to identify which document to review. If multiple documents exist, ask the user which one.

### Step 2: Display Review Start

```
━━━ dockit ► REVIEW ━━━

Document: {doc-name}
Reviewers: {list of enabled reviewers}

Running reviews...
```

### Step 3: Spawn Review Agents

Launch enabled review agents in parallel using the Task tool. Each agent runs independently:

**Voice Reviewer** (if enabled):

- Agent: @.claude/agents/dockit-voice-reviewer.md
- Input: `docs/{doc-name}.md` + `.claude/dockit/style-guide.md`
- Skill: @.claude/skills/brand-voice.md

**Readability Reviewer** (if enabled):

- Agent: @.claude/agents/dockit-readability-reviewer.md
- Input: `docs/{doc-name}.md`
- Skill: @.claude/skills/readability.md
- First runs: `python3 .claude/scripts/readability-score.py docs/{doc-name}.md`

**Completeness Reviewer** (if enabled):

- Agent: @.claude/agents/dockit-completeness-reviewer.md
- Input: `docs/{doc-name}.md` + `.planning/docs/{doc-name}/structure.md`
- Skill: @.claude/skills/completeness.md

**Copy Editor** (if enabled):

- Agent: @.claude/agents/dockit-copy-editor.md
- Input: `docs/{doc-name}.md`
- Skill: @.claude/skills/copy-editing.md

### Step 4: Collect Results

Gather results from all review agents. Merge into a unified review report.

### Step 5: Write Review Report

Create `.planning/reviews/{doc-name}-review.md` using the template (@.claude/dockit/templates/review-report.md) with:

- Summary table of findings per reviewer
- Readability scores
- All findings grouped by reviewer
- Resolution tracking table (all pending)

### Step 6: Present Findings

Present findings grouped by severity, most critical first:

```
━━━ Review Summary ━━━
Voice:         {count} findings ({breakdown})
Readability:   Grade level {score} — {count} findings
Completeness:  {complete}/{total} sections complete, {thin} thin
Copy:          {count} findings ({breakdown})

Total: {total} findings across {count} reviewers
```

Then list all critical findings first, followed by suggestions, then nitpicks.

### Step 7: Enter Polish Phase

Update `.planning/STATE.md` — set phase to `Polish`.

For each finding, the user can:

1. **Fix** — make the change themselves
2. **Skip** — acknowledge but don't change
3. **Rewrite** — run `/dockit:rewrite` for help with that section

Present the first finding and ask the user what they'd like to do.

```
━━━
Next steps:
  Address the findings above, then run /dockit:review again to verify
  Or run /dockit:rewrite {section} for help rewriting a specific section
━━━
```
