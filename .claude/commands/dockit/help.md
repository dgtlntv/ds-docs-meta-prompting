---
name: dockit:help
description: "List all dockit commands with descriptions"
allowed-tools: [Read]
---

<objective>
Display all available dockit commands with their descriptions.
</objective>

<execution_context>
References:
- @.claude/dockit/references/ui-formatting.md
</execution_context>

<process>
Display the following help text:

━━━ dockit ► HELP ━━━

Available commands:

  /dockit:new                Start new documentation
                             Walks through discovery, section selection, and setup

  /dockit:continue           Resume work on current doc
                             Picks up where you left off in any phase

  /dockit:review             Run full review cycle
                             Spawns all enabled reviewers (voice, readability,
                             completeness, copy) in parallel

  /dockit:check-voice        Voice review only
                             Checks documentation against the built-in style guide

  /dockit:check-readability  Readability review only
                             Runs Flesch-Kincaid scoring + qualitative analysis

  /dockit:check-completeness Completeness review only
                             Verifies all planned sections have substantive content

  /dockit:check-copy         Copy editing review only
                             Checks grammar, spelling, formatting, consistency

  /dockit:rewrite            Help rewrite a section
                             Presents context and suggestions, you write the revision

  /dockit:progress           Show documentation progress
                             Displays status for all docs across all phases

  /dockit:help               This help message

Getting started:
  1. Run /dockit:new to start your first document
  2. Run /dockit:continue to write section by section
  3. Run /dockit:review when all sections are complete

━━━
</process>
