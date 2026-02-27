# Style Guide

The voice and writing standards for all design system documentation produced with dockit.

## Overview

This guide defines how documentation reads — the tone, word choices, sentence structure, formatting, and accessibility standards that apply to every document regardless of its type or tier. All content produced during the revision phase (see @.opencode/dockit/references/phases.md) is measured against these rules.

---

## Voice

<voice>

### Tone

<tone_principles>

- **Authoritative, not arrogant** — honest, well-informed, and mindful that not every reader is a specialist. Use jargon sparingly and always explain it. Do not hedge ("you might want to", "it could be useful to").
- **Precise, not pedantic** — clear, concise, and structured for easy scanning. Lead with what matters most. Say what you mean in as few words as possible. Do not over-explain basics.
- **Approachable, not shallow** — accessible to all skill levels while maintaining real depth. Use relatable examples to simplify complexity. Not overly casual, not stiff or academic.

</tone_principles>

### Point of view

<point_of_view>

- Use **second person** ("you") when addressing the reader.
- Use **imperative mood** for instructions ("Add the component", not "You should add the component").
- Avoid first person ("we", "our") in general — the documentation speaks for the design system, not a team. Use first person only when referring to something specific to Canonical as a company or brand.

</point_of_view>

### Tone rules

<tone_rules>

- Contractions are acceptable ("don't", "isn't", "you'll") — they keep the tone approachable.
- Do not use slang, humour, or culturally specific idioms and expressions.
- Do not use exclamation marks in technical content.
- Do not use emojis.

</tone_rules>

</voice>

---

## Terminology

<terminology>

### Flagged words and phrases

Some words and phrases should not appear in documentation. Some have a preferred replacement; others are strictly forbidden and require restructuring the sentence. The full machine-readable list is in @.opencode/dockit/references/flagged-words.txt (in the same directory as this file).

### Component terminology

<component_terms>

- Use the component's exact name as defined in the design system, in PascalCase when referring to the code implementation (for example, "Button", "TextField").
- Use lowercase when referring to the concept generically (for example, "the button component", "a text field").
- Write prop names in backticks: `variant`, `size`, `disabled`.
- Write state names in lowercase: hover, focus, disabled, active, loading.
- Write token names in backticks: `color.primary.500`, `spacing.md`.

</component_terms>

</terminology>

---

## Sentence structure

<sentence_structure>

### Active voice

Use active voice by default — the subject performs the action.

<active_voice_guidance>

- **Good**: "The Button component accepts a `variant` prop."
- **Bad**: "A `variant` prop is accepted by the Button component."

Passive voice is acceptable when:

- The actor is unknown or irrelevant ("The component is rendered on mount").
- Emphasis on the receiver of the action serves accessibility contexts ("Focus is moved to the dialog").

</active_voice_guidance>

### Sentence length

<sentence_length>

- Target: 12–20 words per sentence.
- Maximum: 25 words. Break longer sentences into two.
- Exception: API signatures and technical specifications may exceed this limit.

</sentence_length>

### Parallel structure

Keep lists, headings, and related items grammatically parallel.

<parallel_structure_guidance>

- **Good**: "Add the prop. Set the value. Test the result."
- **Bad**: "Add the prop. The value should be set. Testing the result is recommended."

</parallel_structure_guidance>

</sentence_structure>

---

## Formatting

<formatting>

### Headings

<heading_rules>

- Use sentence case for all headings ("When to use", not "When To Use").
- Do not skip heading levels (H2 → H4 without H3).
- Keep headings short and descriptive — they are labels, not sentences.

</heading_rules>

### Lists

<list_rules>

- Use bullet lists for unordered items.
- Use numbered lists only for sequential steps.
- Start each item with the same part of speech (verb, noun, etc.).
- If items are full sentences, end with periods.
- If items are fragments, omit ending punctuation — unless any bullet in the section contains two sentences, in which case use punctuation for all bullets in that section.

</list_rules>

### Do's and don'ts

<dos_and_donts_rules>

- Always pair a "do" with a "don't".
- Be specific — reference actual variants, props, or scenarios.
- Explain the "why", not only the "what".

</dos_and_donts_rules>

</formatting>

---

## Punctuation

<punctuation>

### Serial comma

Always use the serial (Oxford) comma: "size, variant, and state", not "size, variant and state."

### Dashes

Use en dashes where needed. Never use em dashes.

### Quotation marks

Use straight double quotes for UI labels and user-visible strings. Use backticks for code references.

</punctuation>

---

## Accessibility in writing

<accessibility_writing>

- Do not use "see" or "look at" as the only way to reference content. Instead of "see the example below", write "refer to the following example".
- Do not use gesture-specific or device-specific language. Instead of "click", write "select". Instead of "swipe", write "navigate".
- Do not rely on colour alone to convey meaning in written instructions. Instead of "the red text", write "the error message".
- Use descriptive link text. Write "read the accessibility guidelines" instead of "click here".
- Spell out acronyms on first use, even common ones — for example, "Accessible Rich Internet Applications (ARIA)".

</accessibility_writing>
