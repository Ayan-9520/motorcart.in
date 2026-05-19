import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { AppRole } from "@/types/database";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).optional(),
  password: z.string().min(6),
  role: z.enum(["customer", "dealer", "dsa_agent", "used_car_dealer", "new_car_dealer"]),
});

type FormData = z.infer<typeof schema>;

export function SignupPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "customer" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await registerUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phone: data.phone,
      role: data.role as AppRole,
    });
    setLoading(false);
    if (!error) navigate("/login");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Join as customer, dealer, or DSA partner</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input className="mt-1" {...register("fullName")} />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" className="mt-1" {...register("email")} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input className="mt-1" placeholder="9876543210" {...register("phone")} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" className="mt-1" {...register("password")} />
          </div>
          <div>
            <Label>I am a</Label>
            <select {...register("role")} className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option value="customer">Customer / Buyer</option>
              <option value="dealer">Dealer</option>
              <option value="used_car_dealer">Used Car Dealer</option>
              <option value="new_car_dealer">New Car Dealer</option>
              <option value="dsa_agent">DSA Agent</option>
            </select>
          </div>
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
        </p>
      </CardContent>
    </Card>
  );
}
