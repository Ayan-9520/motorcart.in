import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Shield, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";

export function ProfilePage() {
  const { user, loading, updateProfile } = useUser();
  const { signOut } = useAuth();

  useEffect(() => {
    setPageMeta({ title: "My Profile" });
  }, []);

  if (!user) return null;

  const kycBadge = {
    pending: "outline",
    submitted: "secondary",
    verified: "success",
    rejected: "destructive",
  } as const;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Badge variant={kycBadge[user.kycStatus]}>{user.kycStatus}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Account</CardTitle>
          <CardDescription>{user.email} • {user.role.replace(/_/g, " ")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateProfile({
                full_name: fd.get("fullName") as string,
                phone: fd.get("phone") as string,
                city: fd.get("city") as string,
                state: fd.get("state") as string,
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label>Full Name</Label>
              <Input name="fullName" defaultValue={user.fullName} className="mt-1" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" defaultValue={user.phone ?? ""} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input name="city" defaultValue={user.city ?? ""} className="mt-1" />
              </div>
              <div>
                <Label>State</Label>
                <Input name="state" defaultValue={user.state ?? ""} className="mt-1" />
              </div>
            </div>
            <Button type="submit" variant="gradient" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> KYC Verification</CardTitle>
          <CardDescription>Required for dealers and finance partners</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/profile/kyc">Complete KYC</Link>
          </Button>
          <Button variant="ghost" onClick={() => signOut()}>Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}


