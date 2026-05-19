import { NavLink } from "react-router-dom";
import { Car, Gavel, Home, Landmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/buy", label: "Buy", icon: Car },
  { to: "/auctions", label: "Auctions", icon: Gavel },
  { to: "/finance", label: "Loans", icon: Landmark },
  { to: "/profile", label: "Account", icon: User },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 pb-safe backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
