# Documentation Types

The types of documentation produced in the design system, organized by category.

## Overview

All documentation falls into one of two categories:

- **Concepts** — abstract knowledge: how to think, decide, and structure
- **Constructs** — concrete building blocks: the things you use to build interfaces

During discovery, identify which category and type the document belongs to. The type determines which section checklist applies and how the document is structured.

---

## Concepts

Concepts cover the ideas, decisions, and mental models behind the design system. They answer "why" and "when" questions.

<concept_types>

### Architecture

<definition>
How to structure and compose things at a higher level. Architecture documentation describes the relationships between parts of a system and how they fit together.
</definition>

<examples>
- Application structure
- Page hierarchy
- Navigation models
- Content organisation across a product
</examples>

---

### Principles

<definition>
The overarching beliefs and values that guide design decisions. Principles are opinionated — they express a stance the design system takes.
</definition>

<examples>
- Our approach to colour
- Our approach to networking
- Our philosophy on precision in UI
- Our stance on progressive disclosure
</examples>

---

### Definitions

<definition>
What things are and what they represent. Definitions establish shared vocabulary and clarify boundaries between concepts.
</definition>

<examples>
- What is a component?
- What is a pattern vs. a layout?
- What counts as a "foundation"?
- The difference between states and variants
</examples>

---

### Decision guides

<definition>
When to choose one option over another. Decision guides help practitioners make consistent choices by laying out the criteria and trade-offs.
</definition>

<examples>
- Modal vs. page vs. side panel
- When to introduce friction
- Inline validation vs. summary validation
- When to use a table vs. a list
</examples>

</concept_types>

---

## Constructs

Constructs are the concrete, tangible pieces that make up the design system. They answer "what" and "how" questions. They are listed here from most granular to most composed.

<construct_types>

### Foundation

<definition>
Foundations are the basic elements of styling. They codify brand guidelines so that UIs look and feel like they belong to Canonical. Foundations are usually represented as design tokens.
</definition>

<examples>
- Colours
- Fonts and typography scale
- Spacing
- Borders and border radii
</examples>

---

### Component

<definition>
Components are interactive building blocks for creating a user interface. They are the smallest functional unit — composed of one or more foundations and usually interaction definitions.
</definition>

<examples>
- Button
- Dropdown
- Notification
- Basic table
</examples>

---

### Complex component

<definition>
Complex components solve use cases too involved for a single simple component. They are made up of one or several sub-components. Sub-components cannot function on their own — they only make sense in the context of their parent complex component.
</definition>

<examples>
- Navigation (with navigation items as sub-components)
- Data table (with sortable headers, pagination, and row actions as sub-components)
</examples>

---

### Pattern

<definition>
Patterns compose components, complex components, and other patterns into a reusable design that can appear on different screens. They solve a recurring user problem through a specific arrangement of building blocks.
</definition>

<examples>
- Login form
- Checkout form
- Search with filters
- Empty state with call to action
</examples>

---

### Layout

<definition>
Layouts define the general arrangement and structure of elements within a space — whether that space is a component, a section, or an entire page.
</definition>

<examples>
- Footer layout
- Equal-height card grid
- Overall grid structure
- Sidebar plus content area
</examples>

---

### Page

<definition>
Pages combine patterns, components, and layouts into a full template that can be reused for different cases. A page is the most composed construct in the system.
</definition>

<examples>
- Login page
- Settings page
- Dashboard page
- Error page (404, 500)
</examples>

</construct_types>
