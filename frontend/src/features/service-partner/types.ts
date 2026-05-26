import type { BookingTrackingStep, ServiceBooking } from "@/features/service-booking/types";

export type ShWorkflowStage =
  | "waiting"
  | "inspection"
  | "approval_pending"
  | "in_repair"
  | "washing"
  | "ready_delivery"
  | "delivered";

export type ShMetric = {
  key: string;
  label: string;
  value: number | string;
  sublabel?: string;
  trend?: number;
  sparkline?: number[];
  variant?: "default" | "premium" | "success" | "warning";
  href?: string;
};

export type ShWorkshopProfile = {
  id: string;
  name: string;
  city: string;
  rating: number;
  isVerified: boolean;
  activeJobs: number;
  techniciansOnline: number;
  satisfactionPct: number;
  branchCount: number;
};

export type ShAiInsight = {
  id: string;
  title: string;
  summary: string;
  severity: "info" | "warning" | "success";
  actionUrl?: string;
};

export type ShJobCard = {
  id: string;
  jobNo: string;
  customerName: string;
  customerPhone?: string;
  vehicle: string;
  vin?: string;
  complaints: string;
  technician?: string;
  labourAmount: number;
  estimatedTotal: number;
  stage: ShWorkflowStage;
  deliveryAt?: string;
};

export type ShTechnician = {
  id: string;
  name: string;
  role: string;
  active: boolean;
  jobsToday: number;
  skill: string;
};

export type ShCrmCustomer = {
  id: string;
  name: string;
  phone: string;
  vehicles: number;
  visits: number;
  loyaltyPoints: number;
  lastVisit: string;
};

export type ShKanbanColumn = {
  stage: ShWorkflowStage;
  label: string;
  jobs: ShJobCard[];
};

export type ServicePartnerSnapshot = {
  centerId: string | null;
  profile: ShWorkshopProfile;
  metrics: ShMetric[];
  insights: ShAiInsight[];
  activeVehicles: number;
  bookings: ServiceBooking[];
  jobCards: ShJobCard[];
  kanban: ShKanbanColumn[];
  technicians: ShTechnician[];
  customers: ShCrmCustomer[];
  revenueToday: number;
  revenueMonth: number;
};

export type ShBookingFilter =
  | "all"
  | "new"
  | "upcoming"
  | "in_progress"
  | "pickup"
  | "emergency"
  | "completed"
  | "cancelled";

export function mapTrackingToWorkflow(step: BookingTrackingStep): ShWorkflowStage {
  const m: Partial<Record<BookingTrackingStep, ShWorkflowStage>> = {
    scheduled: "waiting",
    confirmed: "waiting",
    mechanic_assigned: "inspection",
    en_route: "inspection",
    arrived: "inspection",
    in_service: "in_repair",
    completed: "delivered",
    cancelled: "waiting",
  };
  return m[step] ?? "waiting";
}
