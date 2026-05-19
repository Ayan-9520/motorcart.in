import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchCommunityGroups } from "../services/community.service";
import type { CommunityGroup } from "../types";

export function CommunityGroupsPage() {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);

  useEffect(() => {
    void fetchCommunityGroups().then(setGroups);
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/community" className="text-sm text-primary hover:underline">
        ← Feed
      </Link>
      <h1 className="mt-4 flex items-center gap-2 text-2xl font-bold">
        <Users className="h-7 w-7" />
        Community groups
      </h1>
      <p className="text-muted-foreground">Auto groups by city, vehicle topic, trending hub & dealer rooms.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <Link key={g.id} to={`/community/groups/${g.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardContent className="p-5">
                <p className="text-xs uppercase text-muted-foreground">{g.groupType.replace("_", " ")}</p>
                <h2 className="mt-1 font-semibold">{g.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">{g.memberCount.toLocaleString()} members</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
