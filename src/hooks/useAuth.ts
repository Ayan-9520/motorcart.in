import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  fetchUserProfile,
  signInWithEmail,
  signUpWithEmail,
  resendConfirmationEmail,
  isEmailNotConfirmedError,
  signInWithPhoneOtp,
  verifyPhoneOtp,
  signInWithGoogle,
  resetPassword,
  signOut as authSignOut,
  type SignUpPayload,
} from "@/services/auth.service";
import { mapDbUserToAppUser } from "@/services/mapUser";
import { supabase } from "@/integrations/supabase/client";
import toast from "react-hot-toast";

export function useAuth() {
  const { user, isLoading, isAuthenticated, setUser, setLoading, logout } = useAuthStore();

  const loadProfile = useCallback(async (userId: string) => {
    const profile = await fetchUserProfile(userId);
    if (profile) setUser(mapDbUserToAppUser(profile));
    else setUser(null);
  }, [setUser]);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user.id);
      else setUser(null);
    }).finally(() => setLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user.id);
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile, setUser, setLoading]);

  const loginEmail = useCallback(async (email: string, password: string) => {
    const { error } = await signInWithEmail(email, password);
    if (error) {
      if (isEmailNotConfirmedError(error.message)) {
        toast.error("Please verify your email first. Check your inbox and spam, or resend the verification link.", {
          duration: 6000,
        });
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Welcome back!");
    }
    return { error, needsEmailConfirmation: error ? isEmailNotConfirmedError(error.message) : false };
  }, []);

  const register = useCallback(async (payload: SignUpPayload) => {
    const { data, error } = await signUpWithEmail(payload);
    if (error) {
      toast.error(error.message);
      return { data, error, needsEmailConfirmation: false };
    }
    if (data.session) {
      toast.success("Account created — welcome!");
      return { data, error: null, needsEmailConfirmation: false };
    }
    toast.success("Verification link sent to your email");
    return { data, error: null, needsEmailConfirmation: true };
  }, []);

  const resendEmailConfirmation = useCallback(async (email: string) => {
    const { error } = await resendConfirmationEmail(email);
    if (error) toast.error(error.message);
    else toast.success("Verification email resent — please check your inbox");
    return { error };
  }, []);

  const sendOtp = useCallback(async (phone: string) => {
    const formatted = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
    const { error } = await signInWithPhoneOtp(formatted);
    if (error) toast.error(error.message);
    else toast.success("OTP sent to your phone");
    return { error, phone: formatted };
  }, []);

  const verifyOtp = useCallback(async (phone: string, token: string) => {
    const { error } = await verifyPhoneOtp(phone, token);
    if (error) toast.error(error.message);
    else toast.success("Phone verified!");
    return { error };
  }, []);

  const loginGoogle = useCallback(async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
    return { error };
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const { error } = await resetPassword(email);
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent");
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
    logout();
    toast.success("Signed out");
  }, [logout]);

  return {
    user,
    isLoading,
    isAuthenticated,
    loginEmail,
    register,
    resendEmailConfirmation,
    sendOtp,
    verifyOtp,
    loginGoogle,
    forgotPassword,
    signOut,
    refreshProfile: user ? () => loadProfile(user.id) : undefined,
  };
}
