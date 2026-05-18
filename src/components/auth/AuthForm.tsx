import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type EmailForm = z.infer<typeof emailSchema>;

interface AuthFormProps {
  onSuccess?: () => void;
  defaultTab?: "email" | "phone";
}

export function AuthForm({ onSuccess, defaultTab = "email" }: AuthFormProps) {
  const navigate = useNavigate();
  const { loginEmail, sendOtp, verifyOtp, loginGoogle, isLoading } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const onEmailSubmit = async (data: EmailForm) => {
    setSubmitting(true);
    const { error } = await loginEmail(data.email, data.password);
    setSubmitting(false);
    if (!error) {
      onSuccess?.();
      navigate("/dashboard/customer");
    }
  };

  const onSendOtp = async () => {
    setSubmitting(true);
    const { error, phone: p } = await sendOtp(phone);
    setSubmitting(false);
    if (!error && p) {
      setFormattedPhone(p);
      setOtpSent(true);
    }
  };

  const onVerifyOtp = async () => {
    setSubmitting(true);
    const { error } = await verifyOtp(formattedPhone, otp);
    setSubmitting(false);
    if (!error) {
      onSuccess?.();
      navigate("/dashboard/customer");
    }
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email" className="gap-1"><Mail className="h-4 w-4" /> Email</TabsTrigger>
        <TabsTrigger value="phone" className="gap-1"><Phone className="h-4 w-4" /> Phone OTP</TabsTrigger>
      </TabsList>

      <TabsContent value="email">
        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="mt-1" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" variant="gradient" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>
        <p className="mt-3 text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </p>
      </TabsContent>

      <TabsContent value="phone" className="space-y-4">
        {!otpSent ? (
          <>
            <div>
              <Label>Mobile number</Label>
              <Input
                className="mt-1"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="button" variant="gradient" className="w-full" onClick={onSendOtp} disabled={submitting || !phone}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <div>
              <Label>Enter OTP</Label>
              <Input className="mt-1" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
            </div>
            <Button type="button" variant="gradient" className="w-full" onClick={onVerifyOtp} disabled={submitting || otp.length < 4}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Sign In"}
            </Button>
            <Button type="button" variant="ghost" className="w-full text-sm" onClick={() => setOtpSent(false)}>
              Change number
            </Button>
          </>
        )}
      </TabsContent>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
      </div>

      <Button type="button" variant="outline" className="w-full" onClick={() => loginGoogle()} disabled={isLoading}>
        Continue with Google
      </Button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        No account? <Link to="/signup" className="text-primary font-medium hover:underline" onClick={onSuccess}>Sign up</Link>
      </p>
    </Tabs>
  );
}


