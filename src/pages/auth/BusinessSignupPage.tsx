import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AuthStatusAlert } from "@/components/auth/AuthStatusAlert";
import { fetchUserProfile, normalizeAuthEmail } from "@/services/auth.service";
import { mapDbUserToAppUser } from "@/services/mapUser";
import type { AuthErrorUI } from "@/lib/auth-errors";
import type { AppRole } from "@/types/database";
import { useAuthStore } from "@/store/authStore";
import { resolvePostLoginPath } from "@/auth/resolve-post-login";
import { PENDING_APPROVAL_PATH } from "@/auth/ecosystem-roles";
import { resolveBusinessSignupRole } from "@/auth/resolve-business-signup-role";
import { enrichUserWithDealerContext } from "@/auth/enrich-user-dealer";
import {
  DEFAULT_SIGNUP_ROLE,
  SIGNUP_ROLE_OPTIONS,
  SIGNUP_ROLE_VALUES,
} from "@/auth/signup-roles";
import type { BusinessCategory } from "@/auth/business-signup-types";
import { persistBusinessSignupProfile } from "@/services/business-signup.service";
import { setPrivatePageMeta } from "@/utils/seo";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const signupRoleEnum = z.enum(SIGNUP_ROLE_VALUES as [AppRole, ...AppRole[]]);

const schema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  mobile: z.string().refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid 10-digit mobile"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: signupRoleEnum,
  companyName: z.string().min(2, "Company name is required"),
  gst: z
    .string()
    .min(15, "Enter a valid 15-character GSTIN")
    .max(15, "GSTIN must be 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i, "Invalid GSTIN format"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "Select state"),
  businessType: z.string().min(2, "Business type is required"),
  businessCategory: z.enum([
    "multi_brand",
    "single_brand",
    "preowned_lot",
    "new_car_showroom",
    "parts_wholesale",
    "service_garage",
    "dsa_finance",
    "other",
  ] as [BusinessCategory, ...BusinessCategory[]]),
});

type FormData = z.infer<typeof schema>;

export function BusinessSignupPage() {
  const navigate = useNavigate();
  const { register: registerUser, resendEmailConfirmation } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [signupError, setSignupError] = useState<AuthErrorUI | null>(null);
  const [docNames, setDocNames] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: DEFAULT_SIGNUP_ROLE, businessCategory: "multi_brand" },
    mode: "onBlur",
  });

  useEffect(() => {
    setPrivatePageMeta("Business registration");
  }, []);

  const onDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(e.target.files ?? []).map((f) => f.name);
    setDocNames(names);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSignupError(null);
    try {
      const email = normalizeAuthEmail(data.email);
      const businessMeta = {
        gst: data.gst.toUpperCase(),
        business_category: data.businessCategory,
        business_type: data.businessType,
        documents: docNames,
      };

      const signupRole = resolveBusinessSignupRole(data.role as AppRole, data.businessCategory);

      const { error, needsEmailConfirmation, data: authData, errorUI } = await registerUser({
        email,
        password: data.password,
        fullName: data.ownerName.trim(),
        phone: data.mobile.replace(/\D/g, ""),
        role: signupRole,
        businessSignup: true,
        companyName: data.companyName.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        businessMeta,
      });

      if (error) {
        if (errorUI) setSignupError(errorUI);
        return;
      }

      const sessionUser = authData?.session?.user;
      if (sessionUser) {
        await persistBusinessSignupProfile(sessionUser.id, {
          role: signupRole,
          ownerName: data.ownerName,
          email,
          password: data.password,
          mobile: data.mobile,
          companyName: data.companyName,
          gst: data.gst,
          city: data.city,
          state: data.state,
          businessCategory: data.businessCategory,
          businessType: data.businessType,
          documentNames: docNames,
        });
        const row = await fetchUserProfile(sessionUser.id);
        if (row) {
          const enriched = await enrichUserWithDealerContext(mapDbUserToAppUser(row));
          useAuthStore.getState().setUser(enriched);
          useAuthStore.getState().setProfileHydrated(true);
        }
      }

      if (authData?.session) {
        const u = useAuthStore.getState().user;
        navigate(
          u ? resolvePostLoginPath(u.role, null, u) : PENDING_APPROVAL_PATH,
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
          <CardTitle>Verify your business email</CardTitle>
          <CardDescription className="text-pretty">
            We sent a link to <strong>{verifyEmail}</strong>. After verification, sign in — your application will
            enter the admin approval queue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
        <CardTitle>Business registration</CardTitle>
        <CardDescription>
          Dealers, DSA, parts sellers & service partners — GST verification and admin approval required before CRM
          access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {signupError && <AuthStatusAlert error={signupError} className="mb-4" />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="biz-role">Business type</Label>
            <select
              id="biz-role"
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
          <div>
            <Label htmlFor="biz-owner">Owner name</Label>
            <Input id="biz-owner" className="mt-1" disabled={loading} {...register("ownerName")} />
            {errors.ownerName && (
              <p className="mt-1 text-xs text-destructive">{errors.ownerName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="biz-company">Company / showroom name</Label>
            <Input id="biz-company" className="mt-1" disabled={loading} {...register("companyName")} />
            {errors.companyName && (
              <p className="mt-1 text-xs text-destructive">{errors.companyName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="biz-gst">GSTIN</Label>
            <Input id="biz-gst" className="mt-1 uppercase" placeholder="22AAAAA0000A1Z5" disabled={loading} {...register("gst")} />
            {errors.gst && <p className="mt-1 text-xs text-destructive">{errors.gst.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="biz-city">City</Label>
              <Input id="biz-city" className="mt-1" disabled={loading} {...register("city")} />
              {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="biz-state">State</Label>
              <select
                id="biz-state"
                disabled={loading}
                {...register("state")}
                className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="biz-category">Business category</Label>
            <select
              id="biz-category"
              disabled={loading}
              {...register("businessCategory")}
              className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="multi_brand">Multi-brand dealership</option>
              <option value="single_brand">Single-brand franchise</option>
              <option value="preowned_lot">Pre-owned lot</option>
              <option value="new_car_showroom">New car showroom</option>
              <option value="parts_wholesale">Parts wholesale</option>
              <option value="service_garage">Service garage</option>
              <option value="dsa_finance">DSA / finance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="biz-type">Business type (label)</Label>
            <Input
              id="biz-type"
              className="mt-1"
              placeholder="e.g. Authorized Maruti dealer"
              disabled={loading}
              {...register("businessType")}
            />
            {errors.businessType && (
              <p className="mt-1 text-xs text-destructive">{errors.businessType.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="biz-email">Work email</Label>
            <Input id="biz-email" type="email" autoComplete="email" className="mt-1" disabled={loading} {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="biz-mobile">Mobile</Label>
            <Input id="biz-mobile" className="mt-1" placeholder="9876543210" inputMode="tel" disabled={loading} {...register("mobile")} />
            {errors.mobile && <p className="mt-1 text-xs text-destructive">{errors.mobile.message}</p>}
          </div>
          <div>
            <Label htmlFor="biz-password">Password</Label>
            <Input id="biz-password" type="password" autoComplete="new-password" className="mt-1" disabled={loading} {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="biz-docs">Upload documents (GST, PAN, trade license)</Label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-border/80 bg-muted/30 px-3 py-3">
              <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Input
                id="biz-docs"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="border-0 bg-transparent p-0 file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:text-primary-foreground"
                disabled={loading}
                onChange={onDocsChange}
              />
            </div>
            {docNames.length > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">{docNames.join(", ")} — upload to storage after approval.</p>
            )}
          </div>
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting application…
              </>
            ) : (
              "Submit business application"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Buying for personal use?{" "}
          <Link to="/signup/customer" className="font-medium text-primary hover:underline">
            Customer signup
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Legacy form? <Link to="/signup" className="text-primary hover:underline">Original signup</Link>
        </p>
      </CardContent>
    </Card>
  );
}
