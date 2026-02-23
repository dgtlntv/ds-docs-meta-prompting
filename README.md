# dockit — Design Systems Documentation Meta-Prompting Framework

A meta-prompting framework that guides you through writing comprehensive design systems documentation. The LLM asks questions, checks completeness, and reviews quality — but you write every word.

## What It Does

dockit walks you through 5 phases of documentation:

1. **Discovery** — Identify what you're documenting, for whom, and why
2. **Structure** — Choose and order the sections your doc needs
3. **Drafting** — Write each section with guided questions (the LLM never writes for you)
4. **Review** — Run 4 parallel reviewers: voice, readability, completeness, copy editing
5. **Polish** — Address findings and finalize

## Setup

### Claude Code

Copy the framework files into your project or global Claude config:

```bash
# Option A: Project-level (recommended)
# Copy to your project's .claude/ directory
cp -r commands/ .claude/commands/
cp -r agents/ .claude/agents/
cp -r skills/ .claude/skills/
cp -r scripts/ .claude/scripts/
cp -r dockit/ .claude/dockit/
cp CLAUDE.md .claude/CLAUDE.md

# Option B: Global
# Copy to ~/.claude/ for access across all projects
cp -r commands/ ~/.claude/commands/
cp -r agents/ ~/.claude/agents/
cp -r skills/ ~/.claude/skills/
cp -r scripts/ ~/.claude/scripts/
cp -r dockit/ ~/.claude/dockit/
cp CLAUDE.md ~/.claude/CLAUDE.md
```

### Open Code

Open Code uses a flat command structure with hyphens instead of colons:

```bash
# Copy to Open Code config directory
cp -r agents/ ~/.config/opencode/agents/
cp -r skills/ ~/.config/opencode/skills/
cp -r scripts/ ~/.config/opencode/scripts/
cp -r dockit/ ~/.config/opencode/dockit/

# Commands need flat names (rename dockit/name.md → dockit-name.md)
mkdir -p ~/.config/opencode/commands/
for f in commands/dockit/*.md; do
  name=$(basename "$f" .md)
  cp "$f" ~/.config/opencode/commands/dockit-${name}.md"
done
```

For Open Code, invoke commands as `/dockit-new`, `/dockit-review`, etc. (hyphen instead of colon).

## Prerequisites

- **Python 3** — for the readability scoring script (uses stdlib only, no pip install needed)
- **Figma MCP** (optional) — for pulling design context from Figma during documentation

### Figma MCP Setup

If your components are designed in Figma, dockit can read your Figma files to ask better questions during discovery and drafting, and cross-reference your designs during completeness review. This requires the [Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server).

You can connect via the **desktop server** (local, requires Figma desktop app) or the **remote server** (hosted by Figma, uses OAuth).

#### Option A: Desktop Server (recommended)

1. **Open the Figma desktop app** (latest version) and open a Design file
2. **Toggle to Dev Mode** (Shift+D) in the bottom toolbar
3. **Enable the MCP server** — in the inspect panel's MCP section, click **Enable desktop MCP server**
4. **Add to Claude Code:**

```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

5. **Restart Claude Code** to pick up the new MCP server

The desktop server supports both **selection-based** (select a node in Figma, then prompt) and **link-based** (paste a Figma URL) workflows.

#### Option B: Remote Server

```bash
claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp
```

The remote server uses OAuth authentication — you'll be prompted to authorize on first use. It supports link-based workflows only (no selection from the desktop app).

#### Available Tools

The Figma MCP server provides these tools:

| Tool | Purpose |
|------|---------|
| `get_design_context` | Primary tool — pulls code and design context for a node |
| `get_metadata` | Structural overview (XML) — layer names, IDs, positions |
| `get_variable_defs` | Design variables/tokens (colors, spacing, typography) |
| `get_screenshot` | Visual screenshot of a node |
| `get_figjam` | Context from FigJam files |
| `create_design_system_rules` | Prompt for aligning codebase with design system |

Once configured, dockit will automatically use Figma context when you provide a Figma URL or select a node during `/dockit:new` or `/dockit:continue`. If the MCP server isn't configured, dockit works normally without it — Figma integration is entirely optional.

## Quick Start

```
/dockit:help                  # See all commands
/dockit:new                   # Start a new document
/dockit:continue              # Write section by section
/dockit:review                # Run all reviewers
/dockit:progress              # Check status
```

## Commands

| Command | Description |
|---------|-------------|
| `/dockit:new` | Start new documentation (discovery + structure) |
| `/dockit:continue` | Resume work at current phase |
| `/dockit:review` | Run all 4 reviewers in parallel |
| `/dockit:check-voice` | Voice review only |
| `/dockit:check-readability` | Readability scoring + analysis |
| `/dockit:check-completeness` | Section coverage verification |
| `/dockit:check-copy` | Grammar, spelling, formatting |
| `/dockit:rewrite` | Help rewrite a specific section |
| `/dockit:progress` | Show progress across all docs |
| `/dockit:help` | List all commands |

## Document Types

dockit supports 5 documentation types, each with tailored section checklists:

- **Component** — UI components (button, modal, input, etc.)
- **Pattern** — Design patterns (form layout, empty state, loading, etc.)
- **Foundation** — Design foundations (color, typography, spacing, etc.)
- **Content guideline** — Content rules (error messages, labels, etc.)
- **Accessibility standard** — A11y requirements (focus management, contrast, etc.)

## Architecture

```
Commands (user-facing entry points)
    │
    ▼
Workflows (step-by-step orchestration)
    │
    ├──► Agents (personality + role + behavior)
    │       │
    │       └──► Skills (evaluation criteria + scoring rubrics)
    │               │
    │               └──► Scripts (deterministic computation)
    │
    └──► References (shared knowledge)
```

- **Agent** = WHO does it + HOW they behave
- **Skill** = WHAT they know how to evaluate
- **Script** = deterministic computation (no LLM judgment)

## Runtime Files

When active, dockit creates these files in your project:

```
project/
├── .planning/
│   ├── STATE.md                # Current phase and progress
│   ├── reviews/
│   │   └── {doc}-review.md     # Review reports
│   └── docs/
│       └── {doc}/
│           ├── structure.md    # Chosen sections
│           └── checklist.md    # Completion tracking
└── docs/
    └── {doc}.md                # Your documentation
```

## Core Principle

**The LLM never writes your documentation.** It asks questions, checks completeness, and reviews quality. You are always in charge of content.
