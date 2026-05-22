import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { submitInsuranceApplication } from "../services/insurance.service";
import type { InsuranceQuoteOffer } from "../types";

interface InsuranceApplyFormProps {
  offer: InsuranceQuoteOffer;
}

export function InsuranceApplyForm({ offer }: InsuranceApplyFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [regNo, setRegNo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!user) {
      toast.error("Please sign in to buy insurance");
      return;
    }
    if (!name.trim() || !phone.trim()) {
      toast.error("Name and phone required");
      return;
    }
    setSubmitting(true);
    const r = await submitInsuranceApplication({
      partnerId: offer.partnerId,
      vehicleType: offer.vehicleType,
      vehicleYear: offer.vehicleYear,
      vehicleMake: offer.vehicleMake,
      vehicleModel: offer.vehicleModel,
      registrationCity: offer.registrationCity,
      planType: offer.planType,
      idvAmount: offer.idvAmount,
      annualPremium: offer.annualPremium,
      ncbPercent: offer.ncbPercent,
      registrationNumber: regNo,
      applicantName: name,
      applicantPhone: phone,
      applicantEmail: email,
      addons: offer.addons,
    });
    setSubmitting(false);
    if (!r.ok) toast.error(r.error ?? "Failed");
    else {
      toast.success("Policy application submitted!");
      navigate("/dashboard/customer/insurance");
    }
  };

  return (
    <div className="ins-apply-form space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-xs">Full name</Label>
          <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label className="text-xs">Mobile</Label>
          <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" />
        </div>
        <div>
          <Label className="text-xs">Email</Label>
          <Input className="mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label className="text-xs">Registration no.</Label>
          <Input className="mt-1" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="MH02AB1234" />
        </div>
      </div>
      <Button className="w-full rounded-xl" disabled={submitting} onClick={() => void submit()}>
        {submitting ? "Submitting…" : `Pay ${offer.partnerName} — secure checkout`}
      </Button>
      <p className="text-[11px] text-center text-muted-foreground">
        By continuing you agree to share KYC with {offer.partnerName} for policy issuance.
      </p>
    </div>
  );
}
