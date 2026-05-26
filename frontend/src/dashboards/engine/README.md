# Dashboard layout engine

Composable building blocks for operator consoles:

- **`@/dashboards/components/RoleSidebar`** — role-driven navigation (existing).
- **`@/shared/layout/DashboardPageShell`** — page title, description, actions, and content region.

Wire these inside existing `*Layout.tsx` files rather than replacing layouts wholesale, so routes and behaviour stay stable.
