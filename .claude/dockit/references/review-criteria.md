# Review Criteria

TODO: Sophie to review this

Summary of quality standards for each reviewer. Detailed evaluation criteria live in the `skills/` directory — this file is an index and quick reference.

## Voice Review

**Agent**: `@.claude/agents/dockit-voice-reviewer.md`
**Skill**: `@.claude/skills/brand-voice.md`

Evaluates documentation against the built-in style guide at `.claude/dockit/style-guide.md`.

**Checks**:

- Tone alignment (formal/informal/technical as specified)
- Terminology consistency (uses preferred terms, avoids forbidden words)
- Sentence structure patterns (active vs passive voice preference)
- Phrasing conventions (e.g., "select" vs "click", "use" vs "utilize")
- Consistency within the document itself

**Severity levels**: Violation (contradicts style guide) / Deviation (doesn't match pattern) / Suggestion (could be improved)

**Source**: `.claude/dockit/style-guide.md` (ships with dockit)

---

## Readability Review

**Agent**: `@.claude/agents/dockit-readability-reviewer.md`
**Skill**: `@.claude/skills/readability.md`
**Script**: `.claude/scripts/readability-score.py`

Two-pass evaluation: deterministic scoring + LLM qualitative analysis.

**Deterministic checks** (via script):

- Flesch-Kincaid Grade Level
- Flesch Reading Ease
- Average sentence length
- Average word length
- Passive voice estimate

**LLM checks**:

- Jargon appropriateness for the target audience
- Acronym expansion on first use
- Paragraph length and structure
- Information density per section

**Thresholds**:

- Component docs: target grade level 8-10
- Technical API docs: target grade level 10-12
- Sentence length: flag >25 words, ideal 15-20
- Paragraph length: flag >5 sentences

---

## Completeness Review

**Agent**: `@.claude/agents/dockit-completeness-reviewer.md`
**Skill**: `@.claude/skills/completeness.md`

Evaluates whether all planned sections have substantive content.

**Checks**:

- All sections from `structure.md` are present in the doc
- Each section has substantive content (not just a heading or placeholder)
- Stub detection: TODO, TBD, "Coming soon", single-sentence sections
- Cross-references: do's & don'ts reference specific variants, accessibility references specific states
- Internal consistency: component names, prop names, state names match across sections

**Figma cross-reference** (when Figma URL available):

- Documented variants vs Figma variants
- Documented props vs Figma component properties
- Documented anatomy vs Figma layer structure

**Status levels**: Complete / Thin (exists but insufficient) / Stub (placeholder) / Missing

---

## Copy Editing Review

**Agent**: `@.claude/agents/dockit-copy-editor.md`
**Skill**: `@.claude/skills/copy-editing.md`

Evaluates grammar, spelling, and formatting mechanics.

**Checks**:

- Spelling (especially DS-specific terms: "dropdown" vs "drop-down")
- Heading hierarchy (consistent levels, no skipping)
- List formatting (parallel structure, consistent punctuation)
- Code example formatting (language tags, indentation)
- Link formatting
- Terminology consistency (component names match across the doc)

**Scope boundary**: The copy editor does NOT change meaning or voice. If a phrasing is grammatically correct but doesn't match the style guide, that's the voice reviewer's domain.
