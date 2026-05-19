import { useEffect, useState } from "react";
import { UserPlus, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_TEAM } from "../services/crm-mock";
import type { TeamMember } from "../types";
import { setPageMeta } from "@/utils/seo";

export function DealerTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setPageMeta({ title: "Team Management" });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Assign leads and manage sales team access</p>
        </div>
        <Button variant="default" className="gap-1" onClick={() => setShowAdd(!showAdd)}>
          <UserPlus className="h-4 w-4" /> Add member
        </Button>
      </div>

      {showAdd && (
        <Card>
          <CardHeader><CardTitle>Invite team member</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 max-w-lg">
            <div><Label>Name</Label><Input className="mt-1" placeholder="Full name" /></div>
            <div><Label>Email</Label><Input type="email" className="mt-1" placeholder="email@dealer.com" /></div>
            <div className="sm:col-span-2">
              <Button variant="default" onClick={() => setShowAdd(false)}>Send invite</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {team.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Mail className="h-3 w-3" />{member.email}
                </p>
                {member.phone && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />{member.phone}
                  </p>
                )}
                <Badge variant={member.isActive ? "success" : "outline"} className="mt-2">
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
