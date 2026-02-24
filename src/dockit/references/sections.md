# Sections

The sections that make up each documentation category, with guidance on what they cover, how to question the user, and when they are complete.

## Overview

Every document in the design system follows a section structure determined by its category — either **construct** or **concept** (see @./documentation-types.md for the full taxonomy). This file defines the sections available for each category.

Not every section is required for every document. During the structure phase, the user selects which sections apply and in what order.

---

## Construct documentation

Construct documentation covers foundations, components, complex components, patterns, layouts, and pages. These sections are listed in their default order.

<construct_sections>

### Metadata

<covers>
- Name of the construct
- Documentation type (foundation, component, complex component, pattern, layout, or page)
- Tier (Global, Sites, Apps, Pro, or Stores — see @./tiers.md)
- Link to an example image of the construct
</covers>

<guiding_questions>

- "What do you want to document?"
- "What is this {documentation-type} called? What do teams call this internally? Are there alternate names or abbreviations? What do other design systems call this?"
- "Which tier does this belong to — where is it used?"
- "Do you already have a design for this? If yes, do you have a link to a screenshot?"
  </guiding_questions>

<completed_when>
The name, documentation type, and tier are stated clearly. A link to an example image is included if one is available.
</completed_when>

---

### Description

<covers>
- A short summary of what the construct is
- Disambiguation against similar constructs, if necessary
- A brief overview of how the construct is intended to be used
</covers>

<guiding_questions>

- "What is this construct about?"
- "Is there a similar construct users might confuse it with? How is it different?"
- "If someone reads nothing else in this documentation, what is the most important thing they need to know?"
  </guiding_questions>

<completed_when>
A clear, concise description that someone unfamiliar with the construct could understand.
</completed_when>

---

### Anatomy

<covers>
- A numbered list of the parts the construct is made of
- Each item includes the part name and a short description
- A link to an annotated screenshot with numbered labels pointing to each part
</covers>

<guiding_questions>

- "What parts is this construct made of? What aspects would users naturally understand as separate entities?"
- "Which parts are always present and which are optional?"
- "Are there parts that are only visible in certain states or configurations?"
- "What aspects does it make sense to point out, name, and explain further?"
  </guiding_questions>

<completed_when>
There is a numbered list of anatomy parts with names and descriptions. There is a link to an annotated screenshot with numbered labels matching the list.
</completed_when>

---

### Usage

<covers>
- A general description of how and when to use this construct
- A "When to use" sub-section — specific scenarios where this construct is the right choice
- A "When not to use" sub-section — specific scenarios where this construct should not be used, with alternatives suggested where possible
- Additional usage guidance sub-sections as needed — for cases that don't fit into the general description or the "when to use" / "when not to use" structure
</covers>

<guiding_questions>

- "What is the most common scenario where someone reaches for this construct?"
- "What user problem does it solve in that scenario?"
- "When might someone think they need this but actually need something else? What should they use instead?"
- "Are there specific conditions — screen size, data volume, user role — that affect whether this is the right choice?"
- "Is there any usage guidance that doesn't fit neatly into 'when to use' or 'when not to use'? For example, specific rules about how to combine it with other constructs, or constraints on where it can appear?"
  </guiding_questions>

<completed_when>
There is at least a general usage description, a "When to use" sub-section, and a "When not to use" sub-section. Additional usage guidance sub-sections are present if needed.
</completed_when>

---

### Interactions

<covers>
- The interactive states the construct can be in
- How the user can interact with the construct or its interactive parts
- Sub-sections for each interaction type:
  - **Hover** — what happens when the user hovers over the construct or parts of it
  - **Click** — what happens when the user clicks or taps the construct or parts of it
  - **Focus** — what happens when the construct or parts of it receive focus
  - **Keyboard interaction** — how the user operates the construct with a keyboard alone
  - **Disabled** — what happens when the construct or parts of it are disabled, and when disabling is appropriate
- Each sub-section should include images or GIFs showing the interaction, with enlarged cursors to make the interaction point clear
</covers>

<guiding_questions>

- "What happens visually when a user hovers over this construct? Does it change for different parts?"
- "What happens when the user clicks or taps? Does it trigger navigation, open a menu, toggle a state?"
- "How does focus appear on this construct? Is focus moved programmatically at any point?"
- "How does someone operate this with a keyboard alone? What keys do they use? Is there a specific tab order?"
- "When is this construct disabled? What does the disabled state look like? Can individual parts be disabled independently?"
- "Are there any interactions beyond these — drag, long press, swipe, resize?"
  </guiding_questions>

<completed_when>
All interactions the construct supports are covered in the appropriate sub-sections. Each sub-section describes the behaviour clearly. Images or GIFs are included where they help clarify the interaction.
</completed_when>

---

### Examples

<covers>
- Examples of the construct used in specific scenarios or with specific properties applied
- Each example is composed of an image showing the scenario and a short description of the scenario or properties applied
- Helps the documentation consumer build a better understanding of how to use the construct in practice
</covers>

<guiding_questions>

- "What are the most common ways this construct is used in real products?"
- "Are there scenarios where the construct looks or behaves differently depending on context — for example, in a sidebar vs. a main content area?"
- "Are there edge cases worth showing — very long content, empty states, minimal configurations?"
- "Which property combinations are most useful to demonstrate?"
  </guiding_questions>

<completed_when>
There are several example scenarios showing how the construct is used. Each example has an image and a short description.
</completed_when>

---

### Properties

<covers>
- Every property with which the construct can be configured — anything that changes its appearance or behaviour
- Each property includes the following attributes:
  - **Name** — the property name
  - **Required** — whether the property is required or optional
  - **Type** — the data type (boolean, string, number, single select, multi select, slot, object, or callback)
  - **Description** — what the property controls
  - **Constraint** — any validation rules or limits on the value
  - **Options** — the available values, for select-type properties
  - **Default option** — the pre-selected value, if any
</covers>

<guiding_questions>

- "What are all the ways this construct can be configured — in appearance, size, behaviour, or content?"
- "Which properties are required and which are optional?"
- "What type is each property — is it a simple boolean toggle, a string, a number, a selection from a fixed set of options, a slot for nested content, an object, or a callback?"
- "For properties with a fixed set of options, what are the available values? Which one is selected by default?"
- "Are there constraints on any property values — minimum or maximum numbers, character limits, format requirements?"
- "Are there properties that only apply in certain contexts or when combined with other properties?"
- "Are there any properties that are commonly misused or misunderstood?"
  </guiding_questions>

<completed_when>
All properties the construct supports are documented. Each property has a name, required flag, type, and description. Constraints, options, and default options are included where applicable.
</completed_when>

</construct_sections>

---

## Concept documentation

Concept documentation covers architecture, principles, definitions, and decision guides. Concepts vary widely in shape, so their structure is deliberately minimal.

<concept_sections>

### Metadata

<covers>
- Name of the concept
- Documentation type (architecture, principles, definitions, or decision guide)
- Tier (Global, Sites, Apps, Pro, or Stores — see @./tiers.md)
</covers>

<guiding_questions>

- "What do you want to document?"
- "What is this {documentation-type} called? What do teams call this internally? Are there alternate names or abbreviations? What do other design systems call this?"
- "Which tier does this belong to — where is it relevant?"
  </guiding_questions>

<completed_when>
The name, documentation type, and tier are stated clearly.
</completed_when>

---

### Description

<covers>
- A short summary of what the concept is
- Disambiguation against similar concepts, if necessary
- A brief overview of how the concept is intended to be applied
</covers>

<guiding_questions>

- "What is this concept about?"
- "Is there a similar concept users might confuse it with? How is it different?"
- "If someone reads nothing else in this documentation, what is the most important thing they need to know?"
  </guiding_questions>

<completed_when>
A clear, concise description that someone unfamiliar with the concept could understand.
</completed_when>

---

### Content

<covers>
- The substance of the concept in freeform structure
- Concepts vary widely in how they need to be documented — this section is an unrestricted space that allows rich text, images, tables, embeds, and whatever format best serves the material
- May include sub-sections, diagrams, decision trees, comparison tables, or annotated examples as the concept demands
</covers>

<guiding_questions>

- "What are the key ideas someone needs to understand about this concept?"
- "Is there a mental model, diagram, or analogy that helps explain it?"
- "Are there rules or constraints that come with this concept? What happens when they are broken?"
- "Are there related concepts this one builds on or connects to? Should you reference them?"
- "What questions would a practitioner have after reading the description? The content section should answer those."
  </guiding_questions>

<completed_when>
All questions a documentation consumer would have about this concept are answered. The format suits the material — whether that is prose, tables, diagrams, or a combination.
</completed_when>

</concept_sections>
