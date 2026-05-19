import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search, Bell, User, Plus, Car, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginModal } from "@/components/auth/LoginModal";
import { NAV_LINKS } from "@/lib/constants";
import { MEGA_MENU } from "@/features/home/data/homepage-data";
import { useUIStore } from "@/store/uiStore";
import { useAuth } from "@/hooks/useAuth";
import { usePartsCartStore } from "@/store/partsCartStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useNotifications } from "@/hooks/useNotifications";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const megaRef = useRef<HTMLDivElement>(null);
  const { mobileMenuOpen, setMobileMenuOpen, loginModalOpen, setLoginModalOpen } = useUIStore();
  const { user, isAuthenticated } = useAuth();
  const cartCount = usePartsCartStore((s) => s.itemCount());
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setOpenMega(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      <header
        className={cn(
          "nav-shell sticky top-0 z-50 w-full transition-all duration-300",
          scrolled && "shadow-[var(--shadow-card)]"
        )}
      >
        <div className="container mx-auto flex h-[4.25rem] items-center gap-3 px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-primary)]">
              <Car className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">
              Motor<span className="text-primary">cart</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" ref={megaRef}>
            {MEGA_MENU.map((item) => (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMega(openMega === item.label ? null : item.label)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    openMega === item.label
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", openMega === item.label && "rotate-180")}
                  />
                </button>
                {openMega === item.label && (
                  <div className="mega-menu absolute left-0 top-full z-50 mt-2 w-[420px] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card-hover)]">
                    <div className="grid grid-cols-2 gap-6">
                      {item.sections.map((section) => (
                        <div key={section.title}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                            {section.title}
                          </p>
                          <ul className="space-y-1">
                            {section.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  to={link.href}
                                  onClick={() => setOpenMega(null)}
                                  className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={item.href}
                      onClick={() => setOpenMega(null)}
                      className="mt-4 block rounded-xl bg-primary/10 px-3 py-2 text-center text-sm font-semibold text-primary hover:bg-primary/15"
                    >
                      View all {item.label.toLowerCase()} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
            {NAV_LINKS.filter((l) => !["Buy", "Sell", "Finance"].includes(l.label)).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-1 px-2 md:flex lg:max-w-md xl:max-w-lg">
            <form
              className="relative w-full"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/vehicles?q=${encodeURIComponent(searchQuery)}`;
              }}
            >
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vehicles, parts, loans..."
                className="h-11 rounded-xl border-border bg-card pl-10 shadow-sm focus-visible:ring-primary"
              />
            </form>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative hidden sm:flex" asChild>
              <Link to="/cart" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hidden sm:flex" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <Link to="/profile" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => setLoginModalOpen(true)}>
                Login
              </Button>
            )}
            <Button size="sm" className="hidden gap-1.5 rounded-xl shadow-[var(--shadow-primary)] sm:flex" asChild>
              <Link to="/sell">
                <Plus className="h-4 w-4" /> Sell Vehicle
              </Link>
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
          <div className="border-t border-border bg-card p-4 lg:hidden animate-fade-in">
            <form
              className="relative mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.location.href = `/vehicles?q=${encodeURIComponent(searchQuery)}`;
              }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex gap-2">
                {!isAuthenticated && (
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
                <Button className="flex-1" asChild>
                  <Link to="/sell" onClick={() => setMobileMenuOpen(false)}>
                    Sell Vehicle
                  </Link>
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
