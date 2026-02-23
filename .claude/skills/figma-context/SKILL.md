---
name: figma-context
description: Pulls design context from Figma via the Figma desktop MCP server during documentation workflows. Use when a user provides a Figma URL, selects a node in the Figma desktop app, or references existing designs during discovery, drafting, or review.
---

# Figma Context

Hard technique for pulling design context from Figma via the Figma desktop MCP server during documentation workflows.

## Purpose

During discovery and drafting, users often have components, patterns, or foundations already designed in Figma. Rather than requiring the user to manually describe everything, this skill allows the LLM to read Figma files directly — pulling component structure, variants, properties, variables, and screenshots to ask better questions and verify documentation completeness.

**The LLM still does not write documentation.** Figma context is used to:

- Ask more informed questions ("I see you have 3 size variants in Figma — small, medium, large. Want to document all three?")
- Cross-reference what's documented vs what's designed ("Your Figma component has an `isLoading` prop that isn't mentioned in the Props section yet")
- Understand anatomy without requiring the user to describe every detail from scratch

## Connection Modes

The Figma MCP server supports two connection methods:

### Desktop Server (local)

Runs locally through the Figma desktop app at `http://127.0.0.1:3845/mcp`. Supports both selection-based and link-based workflows.

**Setup:**
1. Open the Figma desktop app (latest version)
2. Open a Figma Design file and toggle to Dev Mode (Shift+D)
3. In the MCP server section of the inspect panel, click **Enable desktop MCP server**
4. Add to Claude Code: `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`

### Remote Server

Connects directly to Figma's hosted endpoint at `https://mcp.figma.com/mcp`. Uses OAuth authentication — no desktop app required. Supports link-based workflows only.

## When to Use Figma Context

### During Discovery

- User mentions they have a Figma file or component
- User provides a Figma URL
- User says "it's already designed" or references existing designs
- User selects a node in the Figma desktop app

### During Drafting

- **Anatomy section**: Use `get_metadata` to pull the layer structure, then `get_design_context` for full detail
- **Variants section**: Use `get_design_context` to pull variant definitions (size, style, state) for full coverage
- **Props/API section**: Use `get_design_context` to pull component properties and cross-reference with documented props
- **States section**: Pull interactive states visible in the Figma component
- **Foundations (tokens)**: Use `get_variable_defs` to pull design variables (colors, spacing, typography tokens)

### During Completeness Review

- Cross-reference documented variants against Figma variants
- Check if documented props match Figma component properties
- Verify anatomy descriptions match the Figma layer structure
- Use `get_screenshot` to visually verify what the component looks like

## Available Figma Desktop MCP Tools

The Figma desktop MCP server exposes these tools:

### get_design_context

- **Use**: Primary tool — generates code and design context for a node
- **When**: Translating a design into code, pulling component properties, variants, layout data
- **Input**: Optional `nodeId` (e.g., `"123:456"`). If omitted, uses the currently selected node in Figma.
- **Params**: `artifactType` (WEB_PAGE_OR_APP_SCREEN, COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN, REUSABLE_COMPONENT, DESIGN_SYSTEM), `taskType` (CREATE_ARTIFACT, CHANGE_ARTIFACT, DELETE_ARTIFACT), `forceCode` (boolean, forces code output for large nodes)
- **Note**: This is the main tool to call. Always prefer this over `get_metadata` when you need design details.

### get_metadata

- **Use**: Get a structural overview of a node or page in XML format
- **When**: Understanding the layer hierarchy, finding specific node IDs to drill into, getting an overview before calling `get_design_context`
- **Input**: Optional `nodeId`. If omitted, uses the currently selected node.
- **Returns**: XML with node IDs, layer types, names, positions, and sizes — structure only, no design details
- **Important**: After calling this, you should call `get_design_context` on specific node IDs to get actual design information.

### get_variable_defs

- **Use**: Get design variable definitions (design tokens) for a node
- **When**: Documenting foundations (color, typography, spacing) or understanding which tokens a component uses
- **Input**: Optional `nodeId`. If omitted, uses the currently selected node.
- **Returns**: Variable name-to-value mappings (e.g., `{'icon/default/secondary': #949494}`)

### get_screenshot

- **Use**: Generate a visual screenshot of a node
- **When**: Visually verifying what a component looks like, cross-referencing documentation descriptions with actual appearance
- **Input**: Optional `nodeId`. If omitted, uses the currently selected node.
- **Returns**: An image of the node

### create_design_system_rules

- **Use**: Generate a prompt for analyzing the codebase to create design system integration rules
- **When**: Setting up Code Connect, aligning codebase structure with Figma design system
- **Returns**: A structured prompt covering token definitions, component library, frameworks, asset management, icon system, styling approach, and project structure

### get_figjam

- **Use**: Generate context from FigJam files
- **When**: Pulling content from FigJam diagrams — architecture maps, flows, brainstorming boards
- **Input**: Optional `nodeId`. If omitted, uses the currently selected node.
- **Note**: Only works for FigJam files, not regular Figma Design files.

## How to Provide Figma Context

There are two ways users provide Figma design context:

### Selection-based (desktop server only)

The user selects a frame or layer inside Figma, then asks the LLM to work with it. Call tools without a `nodeId` to use the current selection.

### Link-based

The user copies a Figma URL. Extract the `node-id` from the URL to pass as `nodeId`.

## How to Extract Figma URLs

Figma URLs follow these patterns:

```
Design file:  https://www.figma.com/design/{FILE_KEY}/{FILE_NAME}?node-id={NODE_ID}
Branch:       https://www.figma.com/design/{FILE_KEY}/branch/{BRANCH_KEY}/{FILE_NAME}
FigJam:       https://www.figma.com/board/{FILE_KEY}/{FILE_NAME}?node-id={NODE_ID}
```

To extract a node ID from a URL: parse the `node-id` query parameter. The URL format uses hyphens (e.g., `1-2`) but the MCP tools expect colons (e.g., `1:2`). Convert `node-id=1-2` to `nodeId: "1:2"`.

For branch URLs (`/design/{FILE_KEY}/branch/{BRANCH_KEY}/`), use the `BRANCH_KEY` as the file key.

## Interpreting Figma Data

### Component Properties → Props/API Section

Figma component properties map to documentation props:

- **Boolean properties** → boolean props (e.g., `isDisabled`, `showIcon`)
- **Text properties** → string props (e.g., `label`, `helperText`)
- **Instance swap properties** → slot/child component props (e.g., `icon`, `leadingElement`)
- **Variant properties** → enum props or variant names (e.g., `size: sm | md | lg`)

### Variant Structure → Variants Section

Figma component sets define variants as property combinations:

- Each variant property (size, style, state) becomes a documentation variant axis
- The values for each property become the variant options
- Combinations that exist in Figma should be documented

### Layer Structure → Anatomy Section

Use `get_metadata` to reveal layer hierarchy, then `get_design_context` for detail:

- Top-level frames within the component are major parts
- Named layers correspond to anatomical elements
- Auto-layout structure reveals container relationships
- Hidden layers may represent conditional/optional parts

### Variables → Foundations Documentation

Use `get_variable_defs` to pull design tokens:

- Color variables → color tokens
- Spacing variables → spacing tokens
- Typography variables → typography tokens
- These map directly to design token documentation

## Recommended Tool Sequence

For documenting a component:

1. **`get_screenshot`** — See what the component looks like visually
2. **`get_metadata`** — Understand the layer structure and find key node IDs
3. **`get_design_context`** — Pull full design details for the component (or specific child nodes)
4. **`get_variable_defs`** — Pull associated design tokens/variables

For documenting foundations:

1. **`get_variable_defs`** — Pull all token definitions
2. **`get_screenshot`** — Visually verify the token usage

## Questioning Patterns with Figma Context

When you've pulled Figma data, use it to ask informed questions:

### Variants

- "I can see your Figma component has these variant properties: {list}. Should we document all of these, or are some internal/deprecated?"
- "There are {N} size variants in Figma. Want to walk through each one and describe when to use it?"

### Props

- "Figma shows these component properties: {list}. Do these map 1:1 to your code props, or are there differences?"
- "I see a boolean property called `{name}` in Figma — what does it control?"

### Anatomy

- "Based on the Figma layers, this component has these parts: {list}. Does that match how you think about its anatomy?"
- "I see an optional layer called `{name}` — when is that shown?"

### States

- "Figma shows variants for these states: {list}. Are there additional interactive states not captured in Figma?"

### Tokens / Variables

- "I pulled these design variables from your component: {list}. Should these be documented as part of the component's token usage?"

## Anti-Patterns

- **Don't dump raw Figma data on the user.** Summarize what you found and ask focused questions.
- **Don't assume Figma is the source of truth.** The code implementation may differ from the design. Always ask.
- **Don't auto-generate documentation from Figma.** Use it to ask better questions, not to write content.
- **Don't request Figma access unprompted.** Only use Figma tools when the user provides a URL, selects a node, or asks you to look at their designs.
- **Don't overload the user with Figma details.** Surface what's relevant to the current section being drafted.
- **Don't call `get_metadata` alone and stop.** It only returns structure — always follow up with `get_design_context` for actual design information.

## Output Format

When presenting Figma context to the user during drafting:

```
━━━ Figma Context ━━━

From: {component/frame name} (node {nodeId})

Variants found:
  - Size: sm, md, lg
  - Style: filled, outlined, text
  - State: default, hover, disabled

Properties:
  - label (text)
  - isDisabled (boolean)
  - icon (instance swap)
  - size (variant: sm | md | lg)

Layer structure:
  - Container
    - Icon (optional)
    - Label
    - Trailing icon (optional)

Variables:
  - color-background-layer2: #F5F5F5
  - dimension-200: 16px

━━━
```

Follow this with questions, not with drafted documentation.
