---
name: dockit:help
description: List all dockit commands with descriptions.
allowed-tools: [Read]
---

<objective>
Display all available dockit commands with their descriptions.
</objective>

<process>
Display the following help text exactly:

```
dockit commands:

  /dockit:start        Start new or continue existing documentation.
                       Detects the current state and routes to the
                       appropriate phase automatically.

  /dockit:add-section  Add sections to an existing document.
                       Does not continue into drafting — run
                       /dockit:start afterwards to resume work.

  /dockit:progress     Show documentation progress.
                       Displays status for all documents across
                       all phases.

  /dockit:help         This help message.

Getting started:
  1. Run /dockit:start to begin a new document or resume existing work
  2. Write section by section — drafting then revision
  3. Run /dockit:review when all sections are revised
```
</process>
