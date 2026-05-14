# Storebox File Explorer

A frontend-focused file explorer built with Next.js and React using recursive rendering, immutable tree updates, and an integrated editor workflow.

## Live Demo

[ADD_DEPLOYMENT_LINK_HERE]

## Features

- Create files and folders
- Rename files and folders
- Delete files and folders
- Nested folder support
- Recursive explorer rendering
- File selection and editing
- Local persistence using `localStorage`
- Semantic light/dark theme system

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react icons

## Architecture Highlights

- **Recursive Tree UI**: `ExplorerItem` renders nested nodes through depth-based recursion, with folder expand/collapse behavior and file selection.
- **Custom Recursive Tree Rendering**: The explorer tree was implemented manually using recursive React components and immutable utilities without relying on external tree libraries.
- **Immutable Tree Utilities**: helper functions in `utils/explorerTree.ts` (`addNode`, `renameNode`, `deleteNode`, `findNodeById`, `updateNodeContent`) keep updates pure and predictable.
- **Editor Integration**: selected file state is resolved from the tree and synchronized with a controlled textarea for content editing.
- **Persistence Layer**: explorer state is persisted to `localStorage` and restored on load.

## Project Structure

```text
src/
  app/
  components/
    explorer/
    editor/
  utils/
  types/
  data/
```

## Theme System

The UI uses semantic tokens defined in `app/globals.css`:

- centralized CSS variables for light/dark themes
- neutral, VS Code-inspired palette
- reusable semantic classes (`panel`, `tree-row`, `editor-input`)

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

Development used selective AI assistance:

- AI support was used for scoped implementation and refactoring tasks.
- Architecture, state flow, and final validation were handled through manual review plus lint/build checks.
- No external tree/file explorer libraries were used.
