import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu, X, Search, Bell, User, Plus, Sun, Moon, Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginModal } from "@/components/auth/LoginModal";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, loginModalOpen, setLoginModalOpen } = useUIStore();
  const { resolved, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "border-b bg-background/95 backdrop-blur-lg shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white shadow-wa">
              <Car className="h-5 w-5" />
            </span>
            <span>
              Motor<span className="text-primary">cart</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden max-w-xs flex-1 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search vehicles, parts, loans..." className="pl-9" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolved === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <Link to="/profile" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Button>
            )}
            <Button variant="gradient" size="sm" className="hidden gap-1 sm:flex" asChild>
              <Link to="/sell"><Plus className="h-4 w-4" /> Sell</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-background p-4 lg:hidden animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex gap-2">
                {isAuthenticated ? (
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      {user?.fullName || "Profile"}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                  >
                    Login
                  </Button>
                )}
                <Button variant="gradient" className="flex-1" asChild>
                  <Link to="/sell" onClick={() => setMobileMenuOpen(false)}>Sell Vehicle</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}
