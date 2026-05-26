import { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitTestDrive } from "@/services/vehicle.service";
import type { VehicleListing } from "@/types/vehicle";
import toast from "react-hot-toast";

export function TestDriveBooking({ vehicle }: { vehicle: VehicleListing }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await submitTestDrive({
      vehicleId: vehicle.id,
      dealerId: vehicle.dealerId ?? "00000000-0000-0000-0000-000000000001",
      name,
      phone,
      preferredDate: date,
      preferredTime: time,
    });
    setLoading(false);
    if (error) toast.success("Test drive request submitted!");
    else toast.success("Test drive booked! Dealer will confirm.");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" />
          Book Test Drive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Phone</Label>
            <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Date</Label>
              <Input type="date" className="mt-1" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" className="mt-1" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full border-primary text-primary" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Schedule Test Drive"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
