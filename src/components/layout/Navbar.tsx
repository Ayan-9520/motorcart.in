import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search, User, Car, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/LoginModal";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";
import { useAuth } from "@/hooks/useAuth";
import { usePartsCartStore } from "@/store/partsCartStore";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn("nav-link whitespace-nowrap", isActive && "nav-link-active");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, loginModalOpen, setLoginModalOpen, setSearchOpen } =
    useUIStore();
  const { isAuthenticated } = useAuth();
  const cartCount = usePartsCartStore((s) => s.itemCount());
  const wishlistCount = useVehicleMarketStore((s) => s.wishlist.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSearch = () => setSearchOpen(true);

  return (
    <>
      <header className={cn("nav-shell", scrolled && "nav-shell-scrolled")}>
        <div className="nav-inner container">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-mark">
              <Car className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">
              Motor<span className="text-primary">cart</span>
            </span>
          </Link>

          <nav className="nav-links hidden lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-end">
            <button
              type="button"
              onClick={openSearch}
              className="nav-icon-btn md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-primary" />
            </button>

            <button type="button" onClick={openSearch} className="nav-search" aria-label="Search">
              <Search className="h-4 w-4 shrink-0 text-primary" />
              <span className="nav-search-text">Search…</span>
              <kbd className="nav-kbd">⌘K</kbd>
            </button>

            <Link
              to="/wishlist"
              className={cn("nav-wishlist", wishlistCount > 0 && "nav-wishlist-active")}
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} saved` : ""}`}
            >
              <Heart className={cn("h-5 w-5", wishlistCount > 0 && "fill-current")} />
              {wishlistCount > 0 && (
                <span className="nav-badge nav-badge-destructive">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            <div className="nav-utilities">
              <Link to="/cart" className="nav-icon-btn relative hidden sm:inline-flex" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="nav-badge">{cartCount > 9 ? "9+" : cartCount}</span>
                )}
              </Link>

              <ThemeToggle />

              <div className="hidden sm:block">
                <NotificationDropdown />
              </div>

              {isAuthenticated ? (
                <Link to="/profile" className="nav-icon-btn hidden sm:inline-flex" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="nav-login hidden h-9 rounded-lg px-3 text-sm sm:inline-flex"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Login
                </Button>
              )}

              <button
                type="button"
                className="nav-icon-btn lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="nav-mobile lg:hidden">
            <button
              type="button"
              className="nav-mobile-search"
              onClick={() => {
                openSearch();
                setMobileMenuOpen(false);
              }}
            >
              <Search className="h-4 w-4 text-primary" />
              Search Motorcart
              <kbd className="nav-kbd ml-auto">⌘K</kbd>
            </button>
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn("nav-mobile-link", isActive && "nav-mobile-link-active")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex gap-2 border-t border-border/80 pt-4">
              <Link
                to="/wishlist"
                className="nav-mobile-wishlist flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 py-2.5 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-primary text-primary")} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
            <div className="mt-3 sm:hidden">
              <NotificationDropdown />
            </div>
          </div>
        )}
      </header>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
}
