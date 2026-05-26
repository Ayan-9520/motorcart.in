import { Link } from "react-router-dom";
import { Crown, Shield, Store, Settings } from "lucide-react";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { setPageMeta } from "@/utils/seo";
import { useEffect } from "react";

const LINKS = [
  { href: "/dashboard/dealer/storefront", label: "Public storefront", icon: Store, desc: "SEO, contact & visibility" },
  { href: "/dashboard/dealer/verification", label: "Verification & KYC", icon: Shield, desc: "GST, PAN, documents" },
  { href: "/dashboard/dealer/subscription", label: "Subscription plans", icon: Crown, desc: "Free, Premium, Enterprise" },
];

export function DealerSettingsPage() {
  useEffect(() => {
    setPageMeta({ title: "Dealer settings" });
  }, []);

  return (
    <DealerConsoleShell
      title="Settings"
      description="Workspace configuration for your dealership on Motorcart."
      crumbs={[{ label: "Settings" }]}
    >
      <div className="dealer-os-quick-grid">
        {LINKS.map((l) => (
          <Link key={l.href} to={l.href} className="dealer-os-quick-link">
            <l.icon className="h-5 w-5 text-primary" />
            <span>
              <strong className="block">{l.label}</strong>
              <span className="text-xs text-muted-foreground font-normal">{l.desc}</span>
            </span>
          </Link>
        ))}
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Notifications & integrations — coming in next release.
      </p>
    </DealerConsoleShell>
  );
}
