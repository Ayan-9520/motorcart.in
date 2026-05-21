import { useCallback, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealer } from "../hooks/useDealer";
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
    setPageMeta({ title: "Team management" });
    void load();
  }, [load]);

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
      toast.success("Invite added");
      setEmail("");
      setName("");
      void load();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <DealerConsoleShell
      title="Team management"
      description="Sub-users, sales executives and permission scopes for your dealership."
      crumbs={[{ label: "Team" }]}
    >
      <div className="dealer-os-card">
        <h2 className="font-semibold flex items-center gap-2 mb-4">
          <UserPlus className="h-5 w-5" /> Invite member
        </h2>
        <div className="grid gap-3 sm:grid-cols-4">
          <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="dealer-os-select" value={role} onChange={(e) => setRole(e.target.value as TeamMember["role"])}>
            <option value="sales">Sales</option>
            <option value="manager">Manager</option>
            <option value="support">Support</option>
          </select>
          <Button onClick={() => void invite()}>Add to team</Button>
        </div>
      </div>

      <div className="dealer-os-card mt-4 overflow-hidden">
        <table className="dealer-os-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id}>
                <td className="font-medium">{m.name}</td>
                <td>{m.email}</td>
                <td className="capitalize">{m.role}</td>
                <td>{m.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      void toggleMemberActive(m.id, !m.isActive).then(() => load())
                    }
                  >
                    {m.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
            {!team.length && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
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
