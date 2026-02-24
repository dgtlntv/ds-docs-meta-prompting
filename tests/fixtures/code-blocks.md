# Code test

## Description

This is regular prose that should be analysed.

```typescript
// This entire block should be excluded from analysis.
// It contains many words but they are code, not prose.
const reallyLongVariableName = someFunction(parameterOne, parameterTwo, parameterThree, parameterFour);
```

This paragraph after the code block should be analysed.

## Implementation

Use `variant` to set the style. The `size` prop accepts `small`, `medium`, or `large`.

| Column A | Column B |
| -------- | -------- |
| This table content should be excluded | And this too |

The text after the table should be included in the analysis.
