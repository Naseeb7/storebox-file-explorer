# Storebox File Explorer — Agent Guidelines

## Project Goal

Build a VS Code-style file explorer using React, Next.js, TypeScript, and TailwindCSS.

The explorer must support:

- Create file
- Create folder
- Rename file
- Rename folder
- Delete file
- Delete folder
- Nested folders

Do NOT use external file tree libraries.

---

## Tech Stack

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- lucide-react icons

---

## Architecture Rules

- Use recursive React components for nested folder rendering.
- Keep components small and focused.
- Use immutable state updates only.
- Do not mutate arrays or objects directly.
- Keep helper functions pure where possible.
- Prefer readability over abstraction.

---

## Folder Structure

src/
app/
components/
explorer/
editor/
data/
types/
utils/

---

## UI Rules

- Minimal VS Code-inspired design
- Dark theme
- Small spacing and subtle hover states
- Avoid unnecessary animations
- Avoid overengineering

---

## Constraints

- No external tree/file explorer libraries
- No Redux/Zustand unless explicitly needed
- No backend/database
- No drag-and-drop libraries
- No giant components

---

## Coding Style

- Use TypeScript interfaces/types
- Use descriptive variable names
- Prefer early returns
- Avoid nested ternaries
- Keep JSX readable
- Keep Tailwind classNames organized

---

## Done Means

A task is complete only if:

- TypeScript passes
- No lint errors
- Component remains readable
- UI behavior works correctly
- Existing functionality is not broken

---

## Expectations For AI Assistance

AI should:

- help with scoped implementation tasks
- help with refactoring
- help with helper functions
- help debug issues

AI should NOT:

- rewrite the whole app unnecessarily
- introduce large architectural changes without request
- add unnecessary dependencies
- overcomplicate the solution
