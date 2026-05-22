import { useCallback, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { StaffPermissionsMatrix } from "../components/StaffPermissionsMatrix";
import { CRMDataToolbar } from "../components/CRMDataToolbar";
import { useDealer } from "../hooks/useDealer";
import { usePaginatedFilter } from "../hooks/usePaginatedFilter";
import { fetchDealerMembers, inviteDealerMember, toggleMemberActive } from "../services/dealer-enterprise.service";
import type { TeamMember } from "../types";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function DealerTeamPage() {
  const { dealer, loading } = useDealer();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<TeamMember["role"]>("sales");

  const load = useCallback(async () => {
    if (!dealer) return;
    setTeam(await fetchDealerMembers(dealer.id));
  }, [dealer]);

  useEffect(() => {
    setPageMeta({ title: "Staff management" });
    void load();
  }, [load]);

  const { query, setQuery, page, setPage, pageItems, totalPages, totalCount, resetPage } =
    usePaginatedFilter(
      team,
      (m, q) => {
        const s = q.toLowerCase();
        return m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s);
      },
      8
    );

  const invite = async () => {
    if (!dealer || !email || !name) return;
    const { error } = await inviteDealerMember({
      dealerId: dealer.id,
      email,
      fullName: name,
      role,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Team member added");
      setEmail("");
      setName("");
      void load();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading team…</p>;

  return (
    <DealerConsoleShell
      title="Staff management"
      description="Add employees, assign roles and permission scopes for your dealership."
      crumbs={[{ label: "Team" }]}
    >
      <div className="dealer-os-card">
        <h2 className="font-semibold flex items-center gap-2 mb-4">
          <UserPlus className="h-5 w-5 text-primary" /> Add employee
        </h2>
        <div className="grid gap-3 sm:grid-cols-4">
          <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="dealer-os-select" value={role} onChange={(e) => setRole(e.target.value as TeamMember["role"])}>
            <option value="sales">Sales executive</option>
            <option value="manager">Manager</option>
            <option value="support">Support</option>
            <option value="owner">Owner</option>
          </select>
          <Button className="rounded-xl" onClick={() => void invite()}>
            Add to team
          </Button>
        </div>
      </div>

      <StaffPermissionsMatrix team={team} />

      <CRMDataToolbar
        search={query}
        onSearchChange={(v) => {
          setQuery(v);
          resetPage();
        }}
        searchPlaceholder="Search team…"
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={setPage}
      />

      <div className="dealer-os-card overflow-hidden">
        <table className="dealer-os-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pageItems.map((m) => (
              <tr key={m.id}>
                <td className="font-medium">{m.name}</td>
                <td>{m.email}</td>
                <td className="capitalize">{m.role}</td>
                <td className="text-xs text-muted-foreground">
                  {m.role === "owner" ? "Full access" : m.role === "manager" ? "Ops + CRM" : m.role === "sales" ? "Inventory + leads" : "Support only"}
                </td>
                <td>{m.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => void toggleMemberActive(m.id, !m.isActive).then(() => load())}
                  >
                    {m.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
            {!pageItems.length && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No team members — invite sales executives above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DealerConsoleShell>
  );
}
