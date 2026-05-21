/** Shared cross-cutting UI, API surface, and layout helpers. */
export { supabase } from "./api";
export { AppErrorBoundary } from "./ui/error-boundary/AppErrorBoundary";
export { PageSpinner } from "./ui/loading/PageSpinner";
export { DataTable } from "./ui/data-table/DataTable";
export type { DataTableProps } from "./ui/data-table/DataTable";
export { StatCard } from "./ui/cards/StatCard";
export { FormSection, FormGrid, FormActions } from "./ui/form/AppFormLayout";
export { AppModalHost } from "./ui/modal/AppModalHost";
export { useAppConfirmModal } from "./ui/modal/useAppConfirmModal";
export { DashboardPageShell } from "./layout/DashboardPageShell";
export { FilterToolbar } from "./search/FilterToolbar";
export { notify, toast } from "./notifications/app-toast";
export { useRouteNavigationState } from "./navigation/useRouteNavigationState";
