import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  fetchUserProfile,
  signInWithEmail,
  signUpWithEmail,
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
    if (error) toast.error(error.message);
    else toast.success("Welcome back!");
    return { error };
  }, []);

  const register = useCallback(async (payload: SignUpPayload) => {
    const { error } = await signUpWithEmail(payload);
    if (error) toast.error(error.message);
    else toast.success("Check your email to verify your account");
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
    sendOtp,
    verifyOtp,
    loginGoogle,
    forgotPassword,
    signOut,
    refreshProfile: user ? () => loadProfile(user.id) : undefined,
  };
}
