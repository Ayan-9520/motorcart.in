import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  CreditCard,
  FileText,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

export type SuperAdminNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

export const SUPER_ADMIN_NAV: SuperAdminNavItem[] = [
  { to: "/dashboard/super-admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/super-admin/users", label: "Users", icon: Users },
  { to: "/dashboard/super-admin/dealers", label: "Dealers", icon: Store },
  { to: "/dashboard/super-admin/kyc", label: "KYC", icon: ShieldCheck },
  { to: "/dashboard/super-admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/super-admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { to: "/dashboard/super-admin/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/super-admin/cms", label: "CMS", icon: LayoutTemplate },
  { to: "/dashboard/super-admin/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/super-admin/banners", label: "Banners", icon: Image },
  { to: "/dashboard/super-admin/ai", label: "AI controls", icon: Bot },
  { to: "/dashboard/super-admin/fraud", label: "Fraud", icon: AlertTriangle },
  { to: "/dashboard/super-admin/tickets", label: "Support", icon: LifeBuoy },
];
