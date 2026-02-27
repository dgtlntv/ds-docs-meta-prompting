# Tiers

How the design system organises documentation by the type of user interface it serves.

## Overview

Canonical designs for distinct types of user interfaces — applications, marketing websites, stores, and commercial products. Each type has its own design considerations, technology stack, and user expectations. The design system reflects this by splitting all documentation into **tiers**.

Every piece of documentation — whether concept or construct — belongs to exactly one tier.

<tier_rationale>

### Why tiers exist

- **Different UI types need different solutions.** The way you design a marketing website is distinct from how you design an application. Many concepts and constructs are specific to one tier and irrelevant to others.
- **Technology stacks differ across tiers.** Sites use Flask, Apps use React. Tier-specific documentation can reference the right technology without ambiguity.
- **Grouping by use case reduces noise.** Practitioners working on applications don't need to see sites-specific content. Tiers keep the documentation focused and navigable.

</tier_rationale>

---

## Tier definitions

<tiers>

### Global

<definition>
The tier of concepts and constructs used across almost every product, project, or site. Global documentation applies regardless of what type of interface you are building.
</definition>

<examples>
- Colour foundations
- Typography scale
- Core components like Button or Notification
- Accessibility principles
</examples>

---

### Sites

<definition>
The tier of concepts and constructs mostly used by marketing websites.
</definition>

<examples>
- Marketing page layouts
- Campaign-specific patterns
- SEO-related content guidelines
</examples>

---

### Apps

<definition>
The tier of concepts and constructs mostly used by applications.
</definition>

<examples>
- Application shell architecture
- Stateful interaction patterns
- Complex data table configurations
</examples>

---

### Pro

<definition>
The tier of concepts and constructs mostly used by Ubuntu Pro — commercial and e-commerce patterns.
</definition>

<examples>
- Subscription and billing patterns
- Licence management flows
- Commercial checkout patterns
</examples>

---

### Stores

<definition>
The tier of concepts and constructs mostly used by app and artefact stores.
</definition>

<examples>
- Store listing layouts
- App detail page patterns
- Search and filtering for catalogues
- Rating and review patterns
</examples>

</tiers>
