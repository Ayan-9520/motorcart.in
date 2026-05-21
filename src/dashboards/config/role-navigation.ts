import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Calendar,
  Car,
  FileQuestion,
  FileSpreadsheet,
  Gavel,
  Heart,
  Landmark,
  LayoutDashboard,
  MessageSquare,
  Package,
  Phone,
  Search,
  Settings,
  Shield,
  Store,
  UserCog,
  Users,
  Wrench,
  ClipboardList,
  Crown,
} from "lucide-react";
import type { AppRole } from "@/types/database";
import { isDealerRole } from "@/permissions/role-matching";

export type RoleNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

export type RoleNavContext = {
  title: string;
  subtitle?: string;
  items: RoleNavItem[];
};

export function getRoleNavContext(role: AppRole): RoleNavContext {
  if (role === "super_admin") {
    return {
      title: "Motorcart Control",
      subtitle: "Super admin",
      items: [
        { to: "/dashboard/super-admin", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/dashboard/super-admin/users", label: "Users", icon: Users },
        { to: "/dashboard/super-admin/dealers", label: "Dealers", icon: Store },
        { to: "/dashboard/super-admin/kyc", label: "KYC", icon: Shield },
        { to: "/dashboard/super-admin/analytics", label: "Analytics", icon: BarChart3 },
        { to: "/dashboard/super-admin/subscriptions", label: "Subscriptions", icon: Crown },
        { to: "/dashboard/super-admin/tickets", label: "Support", icon: MessageSquare },
        { to: "/dashboard/super-admin/fraud", label: "Fraud", icon: Shield },
        { to: "/dashboard/super-admin/ai", label: "AI controls", icon: Bot },
        { to: "/dashboard/auction", label: "Auctions", icon: Gavel },
        { to: "/dashboard/admin/finance", label: "Finance OS", icon: Landmark },
      ],
    };
  }

  if (role === "admin") {
    return {
      title: "Operations",
      subtitle: "Admin",
      items: [
        { to: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/dashboard/admin/users", label: "Users", icon: Users },
        { to: "/dashboard/admin/dealers", label: "Dealers", icon: Store },
        { to: "/dashboard/auction", label: "Auctions", icon: Gavel },
        { to: "/dashboard/admin/finance", label: "Finance", icon: Landmark },
        { to: "/dashboard/admin/crm", label: "CRM", icon: MessageSquare },
        { to: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
        { to: "/dashboard/admin/ai", label: "AI agents", icon: Bot },
        { to: "/dashboard/admin/settings", label: "Settings", icon: Settings },
      ],
    };
  }

  if (isDealerRole(role)) {
    return {
      title: "Dealer OS",
      subtitle: "Enterprise CRM",
      items: [
        { to: "/dashboard/dealer", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/dashboard/dealer/inventory", label: "Inventory", icon: Car },
        { to: "/dashboard/dealer/inventory/excel", label: "Bulk upload", icon: FileSpreadsheet },
        { to: "/dashboard/dealer/leads", label: "Lead CRM", icon: Users },
        { to: "/dashboard/dealer/enquiries", label: "Enquiries", icon: FileQuestion },
        { to: "/dashboard/dealer/finance", label: "Finance", icon: Landmark },
        { to: "/dashboard/dealer/auctions", label: "Auctions", icon: Gavel },
        { to: "/dashboard/dealer/whatsapp", label: "WhatsApp", icon: MessageSquare },
        { to: "/dashboard/dealer/calls", label: "Calls", icon: Phone },
        { to: "/dashboard/dealer/analytics", label: "Analytics", icon: BarChart3 },
        { to: "/dashboard/dealer/team", label: "Team", icon: UserCog },
        { to: "/dashboard/dealer/verification", label: "Verification", icon: Shield },
        { to: "/dashboard/dealer/subscription", label: "Plans", icon: Crown },
        { to: "/dashboard/dealer/storefront", label: "Storefront", icon: Store },
        { to: "/dashboard/dealer/settings", label: "Settings", icon: Settings },
      ],
    };
  }

  if (role === "customer") {
    return {
      title: "My Motorcart",
      subtitle: "Your activity",
      items: [
        { to: "/dashboard/customer", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/wishlist", label: "Wishlist", icon: Heart },
        { to: "/search", label: "Saved search", icon: Search },
        { to: "/dashboard/customer/loans", label: "Loan applications", icon: Landmark },
        { to: "/services/my-bookings", label: "Service bookings", icon: Wrench },
        { to: "/services/history", label: "Service history", icon: ClipboardList },
        { to: "/auctions/browse", label: "Auction bids", icon: Gavel },
      ],
    };
  }

  if (role === "dsa_agent") {
    return {
      title: "DSA workspace",
      subtitle: "Finance leads",
      items: [
        { to: "/dashboard/dsa", label: "Pipeline", icon: LayoutDashboard, end: true },
        { to: "/dashboard/dsa/applications", label: "Applications", icon: Landmark },
      ],
    };
  }

  if (role === "service_center") {
    return {
      title: "Service partner",
      subtitle: "Garage hub",
      items: [
        { to: "/dashboard/service", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/dashboard/service/calendar", label: "Calendar", icon: Calendar },
        { to: "/dashboard/service/bookings", label: "Bookings", icon: Wrench },
        { to: "/dashboard/service/analytics", label: "Analytics", icon: BarChart3 },
        { to: "/dashboard/service/settings", label: "Profile & pricing", icon: Settings },
      ],
    };
  }

  if (role === "service_technician") {
    return {
      title: "Technician",
      subtitle: "Jobs",
      items: [
        { to: "/dashboard/technician", label: "Job queue", icon: Wrench, end: true },
      ],
    };
  }

  if (role === "parts_seller") {
    return {
      title: "Parts seller",
      subtitle: "Catalog & orders",
      items: [
        { to: "/dashboard/parts", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/dashboard/parts/inventory", label: "Inventory", icon: Package },
        { to: "/dashboard/parts/upload", label: "Upload parts", icon: FileSpreadsheet },
        { to: "/dashboard/parts/orders", label: "Orders", icon: ClipboardList },
      ],
    };
  }

  if (role === "bank_nbfc") {
    return {
      title: "Lender console",
      subtitle: "NBFC / bank",
      items: [
        { to: "/dashboard/finance", label: "Pipeline", icon: LayoutDashboard, end: true },
        { to: "/dashboard/finance/applications", label: "Applications", icon: Landmark },
      ],
    };
  }

  if (role === "finance_manager") {
    return {
      title: "Finance OS",
      subtitle: "Command center",
      items: [
        { to: "/dashboard/finance-manager", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/dashboard/finance-manager/applications", label: "Applications", icon: Landmark },
        { to: "/dashboard/finance-manager/commissions", label: "Commissions", icon: BarChart3 },
        { to: "/finance/tools", label: "EMI & eligibility", icon: Search },
      ],
    };
  }

  if (role === "auction_partner") {
    return {
      title: "Auctions",
      subtitle: "Partner desk",
      items: [
        { to: "/dashboard/auction", label: "Moderation", icon: Shield, end: true },
        { to: "/auctions", label: "Live hub", icon: Gavel },
      ],
    };
  }

  return {
    title: "Account",
    subtitle: "Motorcart",
    items: [{ to: "/profile", label: "Profile", icon: UserCog, end: true }],
  };
}
