import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { ensureUserProfile } from "@/services/auth.service";
import { mapDbUserToAppUser } from "@/services/mapUser";
import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/types/database";
import type { User } from "@/types";
import toast from "react-hot-toast";
import { getIntentionalSignOut, setIntentionalSignOut } from "@/lib/auth-session-flag";
import { logAuthActivity, registerDeviceTouch } from "@/services/auth-telemetry.service";

function userFromAuthSession(authUser: {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  email_confirmed_at?: string | null;
  user_metadata?: Record<string, unknown>;
}): User {
  return {
    id: authUser.id,
    email: authUser.email ?? "",
    phone: authUser.phone,
    fullName:
      (authUser.user_metadata?.full_name as string) ||
      authUser.email?.split("@")[0] ||
      "User",
    role: (authUser.user_metadata?.role as AppRole) ?? "customer",
    accountStatus: "active",
    kycStatus: "pending",
    isVerified: !!authUser.email_confirmed_at,
    createdAt: authUser.created_at,
  };
}

/** Runs once at app root — do not call from Navbar or feature pages. */
export function useAuthBootstrap() {
  const { setUser, setLoading, setProfileHydrated } = useAuthStore();
  const hadAuthenticatedSessionRef = useRef(false);
  const initialBootDoneRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const finishBoot = () => {
      if (!initialBootDoneRef.current) {
        initialBootDoneRef.current = true;
        setLoading(false);
      }
    };

    const hydrate = async (
      authUser: {
        id: string;
        email?: string;
        phone?: string;
        created_at: string;
        email_confirmed_at?: string | null;
        user_metadata?: Record<string, unknown>;
      },
      awaitProfile: boolean
    ) => {
      if (!mounted) return;

      const applySessionUser = (profile: Awaited<ReturnType<typeof ensureUserProfile>>) => {
        if (profile) {
          setUser(mapDbUserToAppUser(profile));
        } else {
          setUser(userFromAuthSession(authUser));
        }
        setProfileHydrated(true);
      };

      try {
        if (awaitProfile) {
          const profile = await Promise.race([
            ensureUserProfile(authUser),
            new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 8000)),
          ]);
          if (!mounted) return;
          applySessionUser(profile);
          return;
        }

        applySessionUser(null);
        void ensureUserProfile(authUser).then((profile) => {
          if (!mounted || !profile) return;
          setUser(mapDbUserToAppUser(profile));
        });
      } catch {
        if (!mounted) return;
        applySessionUser(null);
      }
    };

    const failsafe = window.setTimeout(finishBoot, 4000);
    const profileFailsafe = window.setTimeout(() => {
      if (mounted && useAuthStore.getState().isAuthenticated && !useAuthStore.getState().profileHydrated) {
        setProfileHydrated(true);
      }
    }, 9000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      queueMicrotask(() => {
        if (!mounted) return;

        if (event === "INITIAL_SESSION") {
          if (session?.user) {
            void hydrate(session.user, true).then(() => {
              hadAuthenticatedSessionRef.current = true;
              void registerDeviceTouch();
            });
          } else {
            setUser(null);
            setProfileHydrated(true);
          }
          finishBoot();
          return;
        }

        void (async () => {
          if (session?.user) {
            await hydrate(session.user, event === "SIGNED_IN" || event === "TOKEN_REFRESHED");
            hadAuthenticatedSessionRef.current = true;
            if (event === "SIGNED_IN") void registerDeviceTouch();
          } else if (event === "SIGNED_OUT") {
            if (hadAuthenticatedSessionRef.current && !getIntentionalSignOut()) {
              toast.error("Your session expired or was signed out elsewhere. Please sign in again.", {
                duration: 5000,
              });
            }
            setIntentionalSignOut(false);
            hadAuthenticatedSessionRef.current = false;
            setUser(null);
            setProfileHydrated(true);
          }
        })();
      });
    });

    return () => {
      mounted = false;
      window.clearTimeout(failsafe);
      window.clearTimeout(profileFailsafe);
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, setProfileHydrated]);
}
