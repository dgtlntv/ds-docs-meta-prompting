---
name: dockit:review
description: "Run full review cycle with all enabled reviewers"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, Task]
---

<objective>
Run all enabled review agents against the current document and present consolidated findings.
</objective>

<execution_context>
References:
- @.claude/dockit/workflows/review-cycle.md
- @.claude/dockit/references/review-criteria.md
- @.claude/dockit/references/ui-formatting.md
- @.claude/agents/dockit-voice-reviewer.md
- @.claude/agents/dockit-readability-reviewer.md
- @.claude/agents/dockit-completeness-reviewer.md
- @.claude/agents/dockit-copy-editor.md
- @.claude/skills/brand-voice.md
- @.claude/skills/readability.md
- @.claude/skills/completeness.md
- @.claude/skills/copy-editing.md
- @.claude/dockit/templates/review-report.md
</execution_context>

<process>
Follow the review-cycle workflow (@.claude/dockit/workflows/review-cycle.md):

1. Read STATE.md to identify the document to review
2. Spawn all 4 review agents in parallel via Task tool
3. Collect and merge results into a review report
4. Write the report to .planning/reviews/{doc-name}-review.md
5. Present findings grouped by severity
6. Update STATE.md to Polish phase
7. Prompt user to address findings

Display: ━━━ dockit ► REVIEW ━━━
</process>
