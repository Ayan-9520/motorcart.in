import { isEmailNotConfirmedError } from "@/services/auth.service";

/** Typed auth failure codes for UI — Supabase often returns generic "Invalid login credentials" */
export type AuthErrorCode =
  | "email_not_verified"
  | "wrong_password"
  | "user_not_found"
  | "sign_in_blocked"
  | "user_already_registered"
  | "signup_database"
  | "weak_password"
  | "rate_limit"
  | "network"
  | "unknown";

export type AuthErrorUI = {
  code: AuthErrorCode;
  title: string;
  description: string;
  variant: "warning" | "destructive" | "info";
  showResendVerification?: boolean;
  showSignupLink?: boolean;
  showForgotPassword?: boolean;
  hints?: string[];
};

export function classifyAuthError(
  message: string,
  options?: { requiresEmailConfirmation?: boolean }
): AuthErrorCode {
  const m = message.toLowerCase();

  if (isEmailNotConfirmedError(message)) return "email_not_verified";

  if (
    m.includes("user not found") ||
    m.includes("no user") ||
    m.includes("user does not exist")
  ) {
    return "user_not_found";
  }

  if (
    m.includes("already registered") ||
    m.includes("already been registered") ||
    m.includes("user already exists")
  ) {
    return "user_already_registered";
  }

  if (m.includes("password should be") || m.includes("weak password")) {
    return "weak_password";
  }

  if (
    m.includes("database error saving new user") ||
    m.includes("unable to save user") ||
    m.includes("users_phone_key") ||
    (m.includes("duplicate key") && m.includes("phone"))
  ) {
    return "signup_database";
  }

  if (m.includes("rate limit") || m.includes("over_email_send_rate_limit")) {
    return "rate_limit";
  }

  if (m.includes("fetch") || m.includes("network") || m.includes("failed to fetch")) {
    return "network";
  }

  if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
    if (options?.requiresEmailConfirmation) return "sign_in_blocked";
    return "wrong_password";
  }

  return "unknown";
}

export function getAuthErrorUI(code: AuthErrorCode, rawMessage?: string): AuthErrorUI {
  switch (code) {
    case "email_not_verified":
      return {
        code,
        title: "Email not verified",
        description:
          "Your account exists but the email address is not confirmed yet. Open the link we sent you, then sign in again.",
        variant: "warning",
        showResendVerification: true,
        showForgotPassword: false,
      };
    case "wrong_password":
      return {
        code,
        title: "Incorrect password",
        description:
          "The email or password does not match our records. Double-check your password or reset it.",
        variant: "destructive",
        showForgotPassword: true,
      };
    case "user_not_found":
      return {
        code,
        title: "No account found",
        description:
          "We could not find an account with this email. Create a free account or try a different email.",
        variant: "info",
        showSignupLink: true,
      };
    case "sign_in_blocked":
      return {
        code,
        title: "Unable to sign in",
        description:
          "Sign-in failed. This usually happens for one of the reasons below — pick the step that applies to you.",
        variant: "warning",
        showResendVerification: true,
        showSignupLink: true,
        showForgotPassword: true,
        hints: [
          "Email not verified — click the confirmation link in your inbox (check spam).",
          "Wrong password — use Forgot password to set a new one.",
          "No account yet — use Sign up to register first.",
        ],
      };
    case "user_already_registered":
      return {
        code,
        title: "Account already exists",
        description: "An account with this email already exists. Sign in or reset your password.",
        variant: "info",
        showForgotPassword: true,
      };
    case "signup_database":
      return {
        code,
        title: "Could not create account",
        description:
          "The server could not save your profile. Run Supabase migration 00022_signup_auth_trigger_fix.sql, or try a different phone number / email.",
        variant: "destructive",
        showForgotPassword: false,
        showSignupLink: false,
        hints: [
          "Apply pending SQL migrations in Supabase (00009, 00010, 00022).",
          "If this email was used before, try Sign in instead.",
          "Use a unique 10-digit mobile number.",
        ],
      };
    case "weak_password":
      return {
        code,
        title: "Password too weak",
        description: "Use at least 6 characters with a mix of letters and numbers.",
        variant: "destructive",
      };
    case "rate_limit":
      return {
        code,
        title: "Too many attempts",
        description: "Please wait a few minutes before trying again or requesting another email.",
        variant: "warning",
      };
    case "network":
      return {
        code,
        title: "Connection problem",
        description: "Could not reach the server. Check your internet connection and try again.",
        variant: "destructive",
      };
    default:
      return {
        code: "unknown",
        title: "Something went wrong",
        description: rawMessage?.trim() || "Please try again in a moment.",
        variant: "destructive",
        showForgotPassword: true,
        showResendVerification: true,
      };
  }
}

/** Short toast text — inline UI carries full detail */
export function getAuthErrorToast(
  code: AuthErrorCode,
  flow: "signin" | "signup" = "signin"
): string {
  switch (code) {
    case "email_not_verified":
      return "Verify your email before signing in.";
    case "wrong_password":
      return "Incorrect email or password.";
    case "user_not_found":
      return "No account found for this email.";
    case "sign_in_blocked":
      return "Sign-in failed — see details below.";
    case "user_already_registered":
      return "This email is already registered.";
    case "signup_database":
      return "Account setup failed — check migrations or use another email/phone.";
    case "rate_limit":
      return "Too many requests. Please wait and try again.";
    case "network":
      return "Network error. Check your connection.";
    default:
      return flow === "signup"
        ? "Sign-up failed. Please try again."
        : "Sign-in failed. Please try again.";
  }
}
