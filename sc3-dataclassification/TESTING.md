# Testing Security Utilities

This project includes security utilities for data classification and control restrictions. The following instructions explain how to run the tests.

## Running Tests

To run the existing test suite, execute the following command in the project root:

```bash
npm test
```

Or specifically for the security utilities:

```bash
npm test src/utils/securityUtils.test.js
```

## Test Structure

The test file `src/utils/securityUtils.test.js` includes tests for:

1. `isSelectionRestricted()` - Checks if a control selection is restricted for a given data classification
2. `getRestrictionReason()` - Returns the reason message for a restriction
3. `validateControlSelection()` - Validates control selections against classification requirements

## Test Coverage

The tests verify:
- Basic functionality at different classification levels (public, internal, confidential, restricted)
- Edge cases handling (non-existent controls, invalid classifications)
- Proper restriction logic for various security controls
- Reason message generation

## Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

The project already includes testing dependencies in `package.json`:
- `@testing-library/react`
- `@testing-library/jest-dom`
- `react-scripts` (includes Jest test runner)