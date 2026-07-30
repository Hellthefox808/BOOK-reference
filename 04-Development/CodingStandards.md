# Coding Standards & Guidelines

## 1. TypeScript Rules
- Strict mode enabled (`"strict": true`).
- No use of explicit `any`. Define interfaces/types or use `unknown`.
- Prefer `interface` for object structures and `type` for unions/primitives.

## 2. React Components & Hooks
- Functional components with TypeScript props.
- File naming convention: `PascalCase` for component files (`ReaderToolbar.tsx`), `camelCase` for utilities/hooks (`useReader.ts`).
- Avoid logic inside components; extract state and side effects into custom hooks.

## 3. Git Branching Strategy
- `main`: Production-ready code.
- `develop`: Integration branch for release candidates.
- `feature/*`: Feature development branches (`feature/epub-reader-engine`).
- `bugfix/*`: Bug fixes (`bugfix/jwt-refresh-fix`).
