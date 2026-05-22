import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { fetchAuthProviderSettings, normalizeAuthEmail } from "@/services/auth.service";
import { AuthStatusAlert } from "@/components/auth/AuthStatusAlert";
import type { AuthErrorUI } from "@/lib/auth-errors";
import { useAuthStore } from "@/store/authStore";
import { resolvePostLoginPath } from "@/auth/resolve-post-login";
import type { AppRole } from "@/types/database";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type EmailForm = z.infer<typeof emailSchema>;

interface AuthFormProps {
  onSuccess?: () => void;
  defaultTab?: "email" | "phone";
}

export function AuthForm({ onSuccess, defaultTab = "email" }: AuthFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from;
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : null;

  const user = useAuthStore((s) => s.user);

  const postLoginDest = (role?: AppRole) =>
    redirectTo ??
    (role ? resolvePostLoginPath(role, from, user ?? undefined) : "/dashboard/customer");

  const {
    loginEmail,
    sendOtp,
    verifyOtp,
    loginGoogle,
    resendEmailConfirmation,
    isLoading,
    isAuthenticated,
  } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [loginError, setLoginError] = useState<AuthErrorUI | null>(null);
  const [attemptedEmail, setAttemptedEmail] = useState("");
  const [providers, setProviders] = useState<{
    phone: boolean;
    google: boolean;
    needsEmailConfirm: boolean;
  } | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);

  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem("motorcart_remember_me") !== "0";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    fetchAuthProviderSettings()
      .then((s) => {
        if (!s) return;
        setProviders({
          phone: s.phoneEnabled,
          google: s.googleEnabled,
          needsEmailConfirm: !s.mailerAutoconfirm,
        });
      })
      .finally(() => setSettingsLoading(false));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });

  const clearLoginError = () => setLoginError(null);

  const onEmailSubmit = async (data: EmailForm) => {
    setSubmitting(true);
    setLoginError(null);
    const email = normalizeAuthEmail(data.email);
    setAttemptedEmail(email);

    const result = await loginEmail(email, data.password);
    setSubmitting(false);

    if (!result.success) {
      if (result.errorUI) setLoginError(result.errorUI);
      return;
    }

    try {
      localStorage.setItem("motorcart_remember_me", rememberMe ? "1" : "0");
    } catch {
      /* ignore */
    }

    onSuccess?.();
    const u = useAuthStore.getState().user;
    navigate(
      u ? resolvePostLoginPath(u.role as AppRole, from, u) : redirectTo ?? "/dashboard/customer",
      { replace: true }
    );
  };

  const onResendVerification = async () => {
    if (!attemptedEmail) return;
    setResending(true);
    const { errorUI } = await resendEmailConfirmation(attemptedEmail);
    setResending(false);
    if (!errorUI) {
      setLoginError({
        code: "email_not_verified",
        title: "Verification email sent",
        description: "Open the new link we sent, then return here to sign in.",
        variant: "info",
        showResendVerification: true,
      });
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
      const u = useAuthStore.getState().user;
      navigate(
        u ? resolvePostLoginPath(u.role as AppRole, from, u) : redirectTo ?? "/dashboard/customer",
        { replace: true }
      );
    }
  };

  const busy = submitting || isLoading;
  const signedInUser = useAuthStore((s) => s.user);
  const dashboardHref = signedInUser
    ? resolvePostLoginPath(signedInUser.role as AppRole, from, signedInUser)
    : redirectTo ?? "/dashboard/customer";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      {settingsLoading ? (
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground" aria-busy="true">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Loading sign-in options…
        </div>
      ) : (
        providers?.needsEmailConfirm && (
          <p className="mb-3 rounded-lg border border-border/80 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            Email verification is required before you can sign in. Check spam if you don&apos;t see our email.
          </p>
        )
      )}

      <TabsList className={providers?.phone ? "grid w-full grid-cols-2" : "grid w-full grid-cols-1"}>
        <TabsTrigger value="email" className="gap-1" disabled={busy}>
          <Mail className="h-4 w-4" /> Email
        </TabsTrigger>
        {providers?.phone === true && (
          <TabsTrigger value="phone" className="gap-1" disabled={busy}>
            <Phone className="h-4 w-4" /> Phone OTP
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="email" className="mt-4 space-y-4">
        {loginError && (
          <AuthStatusAlert
            error={loginError}
            email={attemptedEmail}
            onResendVerification={
              loginError.showResendVerification ? onResendVerification : undefined
            }
            resending={resending}
          />
        )}

        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              className="mt-1"
              disabled={busy}
              {...register("email", { onChange: clearLoginError })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              autoComplete="current-password"
              className="mt-1"
              disabled={busy}
              {...register("password", { onChange: clearLoginError })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <Label htmlFor="remember-me" className="cursor-pointer text-sm font-normal text-muted-foreground">
              Keep me signed in on this device
            </Label>
          </div>
          <Button type="submit" variant="default" className="w-full" disabled={busy}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
      </TabsContent>

      {providers?.phone === true && (
        <TabsContent value="phone" className="mt-4 space-y-4">
          {!otpSent ? (
            <>
              <div>
                <Label htmlFor="auth-phone">Mobile number</Label>
                <Input
                  id="auth-phone"
                  className="mt-1"
                  placeholder="9876543210"
                  inputMode="tel"
                  disabled={busy}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="default"
                className="w-full"
                onClick={onSendOtp}
                disabled={busy || phone.replace(/\D/g, "").length < 10}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP…
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="auth-otp">Enter OTP</Label>
                <Input
                  id="auth-otp"
                  className="mt-1"
                  placeholder="6-digit code"
                  inputMode="numeric"
                  disabled={busy}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                />
              </div>
              <Button
                type="button"
                variant="default"
                className="w-full"
                onClick={onVerifyOtp}
                disabled={busy || otp.length < 4}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm"
                disabled={busy}
                onClick={() => setOtpSent(false)}
              >
                Change number
              </Button>
            </>
          )}
        </TabsContent>
      )}

      {providers?.google === true && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => loginGoogle()}
            disabled={busy}
          >
            Continue with Google
          </Button>
        </>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link to="/signup/customer" className="font-medium text-primary hover:underline" onClick={onSuccess}>
          Customer
        </Link>
        {" · "}
        <Link to="/signup/business" className="font-medium text-primary hover:underline" onClick={onSuccess}>
          Business
        </Link>
      </p>

      {isAuthenticated && (
        <p className="mt-2 text-center text-xs text-primary">
          You are already signed in.{" "}
          <Link to={dashboardHref} className="underline">
            Go to dashboard
          </Link>
        </p>
      )}
    </Tabs>
  );
}
