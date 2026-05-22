import { Shield, Check, X } from "lucide-react";
import type { TeamMember } from "../types";

const PERMISSIONS = [
  { key: "inventory", label: "Inventory" },
  { key: "leads", label: "Leads CRM" },
  { key: "auctions", label: "Auctions" },
  { key: "finance", label: "Finance" },
  { key: "analytics", label: "Analytics" },
  { key: "team", label: "Team admin" },
] as const;

const ROLE_MATRIX: Record<TeamMember["role"], Record<string, boolean>> = {
  owner: { inventory: true, leads: true, auctions: true, finance: true, analytics: true, team: true },
  manager: { inventory: true, leads: true, auctions: true, finance: true, analytics: true, team: false },
  sales: { inventory: true, leads: true, auctions: true, finance: false, analytics: false, team: false },
  support: { inventory: false, leads: true, auctions: false, finance: false, analytics: false, team: false },
};

type StaffPermissionsMatrixProps = {
  team: TeamMember[];
};

export function StaffPermissionsMatrix({ team }: StaffPermissionsMatrixProps) {
  const roles = Array.from(new Set(team.map((m) => m.role)));

  return (
    <div className="dealer-os-card overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Role permissions</h2>
      </div>
      <table className="dealer-os-table min-w-[520px]">
        <thead>
          <tr>
            <th>Permission</th>
            {(["owner", "manager", "sales", "support"] as const).map((r) => (
              <th key={r} className="capitalize text-center">
                {r}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERMISSIONS.map((p) => (
            <tr key={p.key}>
              <td className="font-medium">{p.label}</td>
              {(["owner", "manager", "sales", "support"] as const).map((role) => {
                const allowed = ROLE_MATRIX[role][p.key];
                return (
                  <td key={role} className="text-center">
                    {allowed ? (
                      <Check className="h-4 w-4 text-primary inline" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/50 inline" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {roles.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Active team: {team.filter((m) => m.isActive).length} · Permissions apply on login (RBAC rollout).
        </p>
      )}
    </div>
  );
}
