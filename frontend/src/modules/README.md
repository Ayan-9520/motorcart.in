# Modules (`src/modules`)

Vertical feature slices for the Motorcart ecosystem. **Today**, product code primarily lives in `src/features/*` and `src/pages/*` to avoid a risky mega-move.

## Conventions (target architecture)

- **`modules/<domain>/`** — UI, hooks, and services for one bounded context (e.g. `vehicles`, `finance`).
- **`modules/<domain>/api.ts`** — thin adapters over `@/shared/api` (Supabase / future REST).
- **`shared/`** — cross-cutting UI primitives, layout shells, tables, modals, notifications.
- **`app/`** — root providers, public env parsing, bootstrap.

## Router

This app uses **React Router 7** (`RouterProvider` in `src/router/index.tsx`). **TanStack Router** is not wired yet; adding it would be a deliberate migration with route codegen and QA.

## Migration path

1. New work: colocate under `modules/<domain>` **or** keep using `features/` until a slice is extracted.
2. When moving a feature: copy + re-export from the old path until imports are updated, then delete the shim.
