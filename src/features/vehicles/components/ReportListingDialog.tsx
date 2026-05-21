import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import type { VehicleListing } from "@/types/vehicle";

const REASONS = [
  "Incorrect price or specs",
  "Fake or duplicate listing",
  "Vehicle already sold",
  "Misleading photos",
  "Other",
];

type ReportListingDialogProps = {
  vehicle: VehicleListing;
};

export function ReportListingDialog({ vehicle }: ReportListingDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");

  const submit = () => {
    toast.success("Report submitted — our team will review within 24 hours.");
    setOpen(false);
    setNotes("");
    console.info("[report-listing]", { vehicleId: vehicle.id, reason, notes });
  };

  if (!open) {
    return (
      <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setOpen(true)}>
        <Flag className="h-4 w-4 mr-1" /> Report listing
      </Button>
    );
  }

  return (
    <div className="vm-report-panel">
      <p className="text-sm font-semibold flex items-center gap-2">
        <Flag className="h-4 w-4" /> Report this listing
      </p>
      <select className="vm-select mt-2 w-full" value={reason} onChange={(e) => setReason(e.target.value)}>
        {REASONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <Textarea
        className="mt-2"
        rows={3}
        placeholder="Additional details (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={submit}>
          Submit report
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
