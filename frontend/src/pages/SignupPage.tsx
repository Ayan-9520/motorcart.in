import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AuthStatusAlert } from "@/components/auth/AuthStatusAlert";
import { normalizeAuthEmail } from "@/services/auth.service";
import type { AuthErrorUI } from "@/lib/auth-errors";
import type { AppRole } from "@/types/database";
import { useAuthStore } from "@/store/authStore";
import { resolvePostLoginPath } from "@/auth/resolve-post-login";
import {
  DEFAULT_SIGNUP_ROLE,
  SIGNUP_ROLE_OPTIONS,
  SIGNUP_ROLE_VALUES,
} from "@/auth/signup-roles";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";
import { setPrivatePageMeta } from "@/utils/seo";

const signupRoleEnum = z.enum(
  SIGNUP_ROLE_VALUES as [AppRole, ...AppRole[]]
);

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, "").length >= 10, "Enter a valid 10-digit phone"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: signupRoleEnum,
});

type FormData = z.infer<typeof schema>;

export function SignupPage() {
  const navigate = useNavigate();
  const { register: registerUser, resendEmailConfirmation } = useAuth();

  useEffect(() => {
    setPrivatePageMeta("Create account");
  }, []);
  const [loading, setLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [signupError, setSignupError] = useState<AuthErrorUI | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: DEFAULT_SIGNUP_ROLE },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSignupError(null);

    try {
      const email = normalizeAuthEmail(data.email);
      const { error, needsEmailConfirmation, data: authData, errorUI } = await registerUser({
        email,
        password: data.password,
        fullName: data.fullName.trim(),
        phone: data.phone?.replace(/\D/g, ""),
        role: data.role as AppRole,
      });

      if (error) {
        if (errorUI) setSignupError(errorUI);
        return;
      }

      if (authData?.session) {
        const u = useAuthStore.getState().user;
        navigate(
          u
            ? resolvePostLoginPath(u.role as AppRole, null, u)
            : getRoleDashboardPath(data.role as AppRole),
          { replace: true }
        );
        return;
      }

      if (needsEmailConfirmation) {
        setVerifyEmail(email);
        return;
      }

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (verifyEmail) {
    return (
      <Card className="border-0 shadow-none sm:border sm:shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription className="text-pretty">
            We sent a confirmation link to <strong>{verifyEmail}</strong>. Click it to activate your account, then sign
            in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="rounded-lg border border-border/80 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            Email verification is required. Links expire after 24 hours — resend if needed.
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={resending}
            onClick={async () => {
              setResending(true);
              await resendEmailConfirmation(verifyEmail);
              setResending(false);
            }}
          >
            {resending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Resend verification email"
            )}
          </Button>
          <Button type="button" variant="default" className="w-full" asChild>
            <Link to="/login">Go to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-card">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Register your dealership, DSA, parts, or service business. Buyers submit leads via forms — no buyer
          accounts here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {signupError && <AuthStatusAlert error={signupError} className="mb-4" />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" className="mt-1" disabled={loading} {...register("fullName")} />
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" autoComplete="email" className="mt-1" disabled={loading} {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="signup-phone">Phone</Label>
            <Input
              id="signup-phone"
              className="mt-1"
              placeholder="9876543210"
              inputMode="tel"
              disabled={loading}
              {...register("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              className="mt-1"
              disabled={loading}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="signup-role">Business type</Label>
            <select
              id="signup-role"
              disabled={loading}
              {...register("role")}
              className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              {SIGNUP_ROLE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link to="/signup/customer" className="text-primary hover:underline">
            Customer signup
          </Link>
          {" · "}
          <Link to="/signup/business" className="font-medium text-primary hover:underline">
            Full business form
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
