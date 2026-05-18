import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/useUser";

export function KycPage() {
  const { user, loading, submitKycVerification } = useUser();
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitKycVerification({
      pan,
      aadhaar_last4: aadhaar.slice(-4),
      submitted_at: new Date().toISOString(),
    });
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>KYC Verification</CardTitle>
          <CardDescription>Identity verification for dealers & finance partners</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>PAN Number</Label>
              <Input value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} className="mt-1" placeholder="ABCDE1234F" required />
            </div>
            <div>
              <Label>Aadhaar Number</Label>
              <Input value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} className="mt-1" maxLength={12} required />
            </div>
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              <Upload className="mx-auto h-8 w-8 mb-2 opacity-50" />
              Documents upload to Supabase Storage (dealer-documents bucket)
            </div>
            <Button type="submit" variant="gradient" className="w-full" disabled={loading || user.kycStatus === "verified"}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit for Verification"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" asChild>
              <Link to="/profile">Back to Profile</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

