# Storebox File Explorer

A frontend-focused file explorer built with Next.js and React, designed around recursive rendering, immutable tree updates, and a clean editor workflow.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react icons

## Architecture Highlights

- **Recursive Tree UI**: `ExplorerItem` renders nested nodes through depth-based recursion, with folder expand/collapse behavior and file selection.
- **Immutable Tree Utilities**: helper functions in `utils/explorerTree.ts` (`addNode`, `renameNode`, `deleteNode`, `findNodeById`, `updateNodeContent`) keep updates pure and predictable.
- **Editor Integration**: selected file state is resolved from the tree and synchronized with a controlled textarea for content editing.
- **Persistence Layer**: explorer state is persisted to `localStorage` and restored on load.

## Theme System

The UI uses a semantic token approach in `app/globals.css`:

- centralized CSS variables for light/dark themes
- neutral VS Code-inspired palette
- reusable semantic classes (`panel`, `tree-row`, `editor-input`, etc.)

## Development

```bash
npm install
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run build
```

## Engineering Workflow

Development followed a selective AI-assisted workflow:

- AI support was used for targeted implementation tasks (recursive tree behavior, immutable helper design, and UI refinement).
- Architecture and quality gates were validated through iterative review, lint, and build checks.
