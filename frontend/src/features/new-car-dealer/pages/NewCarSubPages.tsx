import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NcdModulePlaceholder } from "../components/NcdModulePlaceholder";
import { NewCarDealerShell } from "../components/NewCarDealerShell";
import { useNewCarDealerOS } from "../hooks/useNewCarDealerOS";
import { setPageMeta } from "@/utils/seo";

export function NewCarInsurancePage() {
  useEffect(() => setPageMeta({ title: "Insurance hub" }), []);
  return (
    <NcdModulePlaceholder
      title="Insurance hub"
      description="ACKO, Tata AIG, ICICI Lombard, Bajaj Allianz — quotes, renewals & commission."
      features={["Instant quote", "Compare policies", "Renewal reminders", "Claim assistance", "Commission tracking"]}
    >
      <Button className="mt-4 rounded-xl" asChild>
        <Link to="/insurance">Insurance marketplace</Link>
      </Button>
    </NcdModulePlaceholder>
  );
}

export function NewCarTestDrivesPage() {
  useEffect(() => setPageMeta({ title: "Test drives" }), []);
  return (
    <NcdModulePlaceholder
      title="Test drive management"
      description="Calendar, vehicle & executive assignment, OTP & feedback."
      features={["Booking calendar", "Vehicle assignment", "Executive routing", "OTP verification", "Customer feedback"]}
    />
  );
}

export function NewCarRtoPage() {
  useEffect(() => setPageMeta({ title: "RTO & documents" }), []);
  return (
    <NcdModulePlaceholder
      title="RTO & documents"
      description="RC, temp reg, HSRP, FASTag, PUC & insurance dossier."
      features={["RC tracking", "Temp registration", "HSRP status", "FASTag activation", "PUC & insurance files"]}
    />
  );
}

export function NewCarCustomersPage() {
  useEffect(() => setPageMeta({ title: "Customer 360" }), []);
  return (
    <NcdModulePlaceholder
      title="Customer 360"
      description="Lifecycle, service, insurance renewals, loyalty & referrals."
      features={["Purchase history", "Service visits", "Insurance renewals", "Birthday & anniversary", "Loyalty points"]}
    />
  );
}

export function NewCarWhatsAppPage() {
  useEffect(() => setPageMeta({ title: "WhatsApp CRM" }), []);
  return (
    <NcdModulePlaceholder
      title="WhatsApp automation"
      description="Auto replies, booking & renewal nudges, birthday wishes."
      features={["Auto replies", "Booking reminders", "Service nudges", "Insurance alerts", "Campaign broadcasts"]}
    >
      <p className="mt-4 text-sm text-muted-foreground">
        Full WhatsApp desk integration ships next — use Lead CRM for enquiries today.
      </p>
    </NcdModulePlaceholder>
  );
}

export function NewCarAnalyticsPage() {
  const { data } = useNewCarDealerOS();
  useEffect(() => setPageMeta({ title: "Analytics" }), []);
  return (
    <NewCarDealerShell title="Analytics center" description="Sales, conversion, inventory aging & finance penetration.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="ncd-panel">
          <p className="text-sm text-muted-foreground">Finance penetration</p>
          <p className="text-3xl font-bold">68%</p>
        </div>
        <div className="ncd-panel">
          <p className="text-sm text-muted-foreground">Insurance penetration</p>
          <p className="text-3xl font-bold">74%</p>
        </div>
        <div className="ncd-panel">
          <p className="text-sm text-muted-foreground">Top variant demand</p>
          <p className="text-xl font-bold">Creta SX(O)</p>
        </div>
        <div className="ncd-panel">
          <p className="text-sm text-muted-foreground">Slow stock</p>
          <p className="text-xl font-bold">Venue Knight</p>
        </div>
      </div>
    </NewCarDealerShell>
  );
}

export function NewCarMarketingPage() {
  useEffect(() => setPageMeta({ title: "Marketing" }), []);
  return (
    <NcdModulePlaceholder
      title="Marketing center"
      description="WhatsApp, SMS, email & festive campaigns."
      features={["WhatsApp blast", "SMS offers", "Email drips", "Festive bundles", "Referral programs"]}
    />
  );
}

export function NewCarExchangePage() {
  useEffect(() => setPageMeta({ title: "Exchange" }), []);
  return (
    <NcdModulePlaceholder
      title="Exchange cars"
      description="RC upload, inspection, AI valuation & auction routing."
      features={["RC upload", "AI pricing", "Inspection queue", "Trade-in offers", "Auction routing"]}
    />
  );
}

export function NewCarAiPage() {
  const { data } = useNewCarDealerOS();
  useEffect(() => setPageMeta({ title: "AI assistant" }), []);
  return (
    <NewCarDealerShell title="AI business assistant" description="Demand signals, discount tips & conversion predictions.">
      <ul className="space-y-3">
        {(data?.insights ?? []).map((i) => (
          <li key={i.id} className="ncd-ai-card">
            <p className="font-semibold">{i.title}</p>
            <p className="text-sm text-muted-foreground">{i.summary}</p>
          </li>
        ))}
      </ul>
    </NewCarDealerShell>
  );
}

export function NewCarStorefrontPage() {
  useEffect(() => setPageMeta({ title: "Showroom website" }), []);
  return (
    <NcdModulePlaceholder
      title="Showroom website builder"
      description="Public mini-site — inventory, offers, reviews & booking forms."
      features={["Dealership profile", "Live inventory", "Customer reviews", "Offer banners", "SEO landing pages"]}
    >
      <p className="mt-4 text-sm text-muted-foreground">
        Connect your public showroom URL from Settings when ready.
      </p>
    </NcdModulePlaceholder>
  );
}

export function NewCarAccessoriesPage() {
  useEffect(() => setPageMeta({ title: "Accessories" }), []);
  return (
    <NcdModulePlaceholder
      title="Accessories & add-ons"
      description="Floor mats, seat covers, infotainment, ceramic coat & RSA kits."
      features={["Accessory catalog", "Bundle builder", "Fitment tracking", "Invoice line items", "Attach rate analytics"]}
    />
  );
}
