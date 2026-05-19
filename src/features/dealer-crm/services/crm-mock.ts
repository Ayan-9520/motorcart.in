import type { CallLogEntry, ListingPerformance, TeamMember } from "../types";

export const MOCK_TEAM: TeamMember[] = [
  { id: "t1", name: "Rajesh Kumar", email: "rajesh@dealer.com", phone: "9876543210", role: "owner", isActive: true },
  { id: "t2", name: "Priya Sharma", email: "priya@dealer.com", phone: "9876543211", role: "manager", isActive: true },
  { id: "t3", name: "Amit Patel", email: "amit@dealer.com", phone: "9876543212", role: "sales", isActive: true },
  { id: "t4", name: "Sneha Reddy", email: "sneha@dealer.com", role: "support", isActive: false },
];

export const MOCK_CALLS: CallLogEntry[] = [
  { id: "c1", leadName: "Arjun Mehta", phone: "9988776655", duration: 245, outcome: "answered", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "c2", leadName: "Unknown", phone: "9123456789", duration: 0, outcome: "missed", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "c3", leadName: "Kavita Singh", phone: "9876512345", duration: 180, outcome: "answered", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export function mockListingPerformance(vehicles: { id: string; title: string; status: string }[]): ListingPerformance[] {
  return vehicles.slice(0, 8).map((v, i) => ({
    vehicleId: v.id,
    title: v.title,
    views: 1200 - i * 120 + Math.floor(Math.random() * 200),
    enquiries: 24 - i * 3,
    whatsappClicks: 18 - i * 2,
    status: v.status,
  }));
}
