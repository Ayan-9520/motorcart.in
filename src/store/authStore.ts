import { create } from "zustand";
import type { User } from "@/types";
import type { UserRole } from "@/lib/constants";
import type { AppRole } from "@/types/database";
import { userCanAccessRoles } from "@/auth/workspace-role";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  profileHydrated: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setProfileHydrated: (hydrated: boolean) => void;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  profileHydrated: false,
  isAuthenticated: false,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setProfileHydrated: (profileHydrated) => set({ profileHydrated }),
  logout: () => set({ user: null, isAuthenticated: false, profileHydrated: true }),
  hasRole: (roles) => {
    const user = get().user;
    if (!user) return false;
    const list = (Array.isArray(roles) ? roles : [roles]) as AppRole[];
    return userCanAccessRoles(user, list);
  },
}));
