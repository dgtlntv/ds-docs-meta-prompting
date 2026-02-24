---
name: button
type: component
---

# Button

## Description

The Button component triggers actions when a user selects it. Use buttons for the primary actions on a page.

## Usage

Use the Button component when you need to trigger an action. The most common scenario is form submission. Buttons also work well for navigation to important destinations.

Do not use the Button component for inline text links. Use the Link component instead. Links navigate to a new page or section. Buttons perform actions on the current page.

## Anatomy

The Button component has three parts:

1. Container — the outer boundary of the button that defines its clickable area
2. Label — the text inside the button that describes the action
3. Icon — an optional visual element placed before or after the label to reinforce meaning

## Properties

The `variant` prop controls the visual style. The `size` prop controls the dimensions. The `disabled` prop prevents interaction when set to true.

```jsx
<Button variant="primary" size="medium">
  Submit
</Button>
```

This code block should be excluded from the readability analysis entirely and should not affect the scores.
