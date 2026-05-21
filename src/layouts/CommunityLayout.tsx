import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  LogOut,
  UserCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SocialAvatar } from "@/features/community/components/SocialAvatar";
import { Button } from "@/components/ui/button";

function isFeedPath(pathname: string) {
  return pathname === "/community";
}

export function CommunityLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut, isLoading } = useAuth();

  const profileHref = user ? `/community/u/${user.id}` : "/login?redirect=/community/me";

  const nav = [
    { href: "/community", label: "Feed", icon: Home, active: isFeedPath(pathname) },
    {
      href: profileHref,
      label: "Profile",
      icon: UserCircle,
      active: pathname.startsWith("/community/u/") || pathname === "/community/me",
      authOnly: true,
    },
    {
      href: "/community/groups",
      label: "Groups",
      icon: Users,
      active: pathname.startsWith("/community/groups"),
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/community", { replace: true });
  };

  return (
    <div className="community-app-shell">
      <aside className="community-app-rail hidden lg:flex" aria-label="Community">
        <Link to="/" className="community-app-back">
          <ArrowLeft className="h-4 w-4" />
          Motorcart
        </Link>

        <p className="community-app-rail-title">Community</p>

        <nav className="community-app-nav">
          {nav.map((item) => {
            if (item.authOnly && !isAuthenticated) return null;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn("community-app-nav-item", item.active && "community-app-nav-item-active")}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="community-app-rail-foot">
          {isAuthenticated && user ? (
            <>
              <Link to={profileHref} className="community-app-user-card">
                <SocialAvatar userId={user.id} name={user.fullName} src={user.avatarUrl} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.fullName}</p>
                  <p className="truncate text-xs text-muted-foreground">Community profile</p>
                </div>
              </Link>
              <Button
                type="button"
                variant="destructive"
                className="community-app-signout w-full rounded-xl font-semibold"
                disabled={isLoading}
                onClick={() => void handleSignOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
              <p className="px-1 text-[11px] leading-snug text-muted-foreground">
                Account login is shared with Motorcart workspace — community profile is separate under Profile.
              </p>
            </>
          ) : (
            <>
              <Button className="w-full rounded-xl font-semibold" asChild>
                <Link to="/login?redirect=/community">Sign in to post</Link>
              </Button>
              <p className="px-1 text-[11px] text-muted-foreground">
                New here?{" "}
                <Link to="/signup?redirect=/community" className="font-medium text-primary hover:underline">
                  Create account
                </Link>
              </p>
            </>
          )}
        </div>
      </aside>

      <div className="community-app-main min-w-0 flex-1">
        <Outlet />
      </div>

      <nav className="community-app-mobile-bar lg:hidden" aria-label="Community">
        {nav.map((item) => {
          if (item.authOnly && !isAuthenticated) return null;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn("community-app-mobile-item", item.active && "community-app-mobile-item-active")}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {isAuthenticated ? (
          <button
            type="button"
            className="community-app-mobile-item text-destructive"
            onClick={() => void handleSignOut()}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </button>
        ) : (
          <Link to="/login?redirect=/community" className="community-app-mobile-item">
            <UserCircle className="h-5 w-5" />
            <span>Sign in</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
