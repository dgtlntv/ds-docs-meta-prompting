# dockit Style Guide

TODO: Cowork this with Sophie

The voice and writing standards for all design systems documentation produced with dockit.

## Voice

### Tone

- **Clear and direct** — say what you mean in as few words as possible
- **Confident but not arrogant** — state things plainly, avoid hedging ("you might want to", "it could be useful to")
- **Helpful, not patronizing** — assume the reader is competent, don't over-explain basics
- **Neutral and professional** — not overly casual, not stiff or academic

### Point of View

- Use **second person** ("you") when addressing the reader
- Use **imperative mood** for instructions ("Add the component", not "You should add the component")
- Avoid first person ("we", "our") — the documentation speaks for the design system, not a team

### Formality

- Contractions are fine ("don't", "isn't", "you'll") — they keep the tone approachable
- Avoid slang, humor, or culturally specific idioms
- No exclamation marks in technical content

## Terminology

### Preferred Terms

| Use       | Instead of                                               |
| --------- | -------------------------------------------------------- |
| use       | utilize, leverage, employ                                |
| make sure | ensure                                                   |
| start     | initiate, commence                                       |
| end       | terminate, finalize                                      |
| set up    | configure (unless referring to a config file)            |
| show      | display, render (unless technically precise)             |
| hide      | dismiss (unless describing a user action)                |
| select    | click, tap (platform-neutral)                            |
| enter     | type, input                                              |
| remove    | delete, destroy                                          |
| change    | modify, alter, update                                    |
| need      | require (unless specifying a hard technical requirement) |
| about     | approximately, roughly                                   |
| built-in  | out-of-the-box, OOTB                                     |

### Forbidden Words and Phrases

- "simply", "just", "easily", "obviously" — these minimize complexity and frustrate readers who find it difficult
- "please" — documentation is not a request
- "in order to" — use "to"
- "it should be noted that" — just state the thing
- "as a matter of fact" — just state the fact
- "leverage" (as a verb) — use "use"
- "utilize" — use "use"
- "functionality" — use "feature" or describe what it does
- "in terms of" — rephrase directly
- "basically" — remove it or explain properly

### Component Terminology

- Use the component's exact name as defined in the design system, in PascalCase when referring to the code implementation (e.g., "Button", "TextField")
- Use lowercase when referring to the concept generically (e.g., "the button component", "a text field")
- Prop names always in backticks: `variant`, `size`, `disabled`
- State names in lowercase: hover, focus, disabled, active, loading
- Token names in backticks: `color.primary.500`, `spacing.md`

## Sentence Structure

### Active Voice

Use active voice by default. The subject performs the action.

- **Good**: "The Button component accepts a `variant` prop."
- **Bad**: "A `variant` prop is accepted by the Button component."

Passive voice is acceptable when:

- The actor is unknown or irrelevant ("The component is rendered on mount")
- Emphasizing the receiver of the action in accessibility contexts ("Focus is moved to the dialog")

### Sentence Length

- Target: 15–20 words per sentence
- Maximum: 25 words — break longer sentences into two
- Exception: API signatures and technical specifications may be longer

### Parallel Structure

Keep lists, headings, and related items grammatically parallel:

- **Good**: "Add the prop. Set the value. Test the result."
- **Bad**: "Add the prop. The value should be set. Testing the result is recommended."

## Structure and Formatting

### Headings

- Use sentence case for all headings ("When to use", not "When To Use")
- Don't skip heading levels (H2 → H4 without H3)
- Keep headings short and descriptive — they're labels, not sentences

### Lists

- Use bullet lists for unordered items
- Use numbered lists only for sequential steps
- Start each item with the same part of speech (verb, noun, etc.)
- If items are full sentences, end with periods
- If items are fragments, no ending punctuation

### Code Examples

- Always include a language tag on fenced code blocks (`jsx, `css, etc.)
- Show the simplest working example first
- Include imports when they're needed to understand the example
- Use consistent indentation (2 spaces)
- Prop names in code examples must match the Props/API section exactly

### Do's and Don'ts

- Always pair a "do" with a "don't"
- Be specific — reference actual variants, props, or scenarios
- Explain the "why", not just the "what"

## Punctuation

### Serial Comma

Always use the serial (Oxford) comma: "size, variant, and state" — not "size, variant and state."

### Em Dashes

Use em dashes (—) with no surrounding spaces for parenthetical statements: "The component — available in three sizes — renders inline."

### Quotation Marks

Use straight double quotes for UI labels and user-visible strings. Use backticks for code references.

## Accessibility in Writing

- Don't use "see" or "look at" as the only way to reference content ("see the example below" → "refer to the following example")
- Don't rely on color alone to convey meaning in written instructions ("the red text" → "the error message")
- Use descriptive link text ("read the accessibility guidelines" not "click here")
- Spell out acronyms on first use, even common ones like ARIA ("Accessible Rich Internet Applications (ARIA)")
