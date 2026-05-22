import { Bell, Car, Gavel, Home, Search, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CAR_IMG =
  "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800";

function PhoneFrame({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div className={`app-phone-frame app-phone-frame-${size} ${className ?? ""}`}>
      <div className="app-phone-bezel">
        <div className="app-phone-island" />
        <div className="app-phone-screen">{children}</div>
        <div className="app-phone-home-indicator" />
      </div>
    </div>
  );
}

function AppHomeScreen() {
  return (
    <div className="app-screen app-screen-home">
      <div className="app-status-bar">
        <span>9:41</span>
        <span className="app-status-icons">●●●</span>
      </div>
      <div className="app-header">
        <span className="app-logo-mark">M</span>
        <span className="app-logo-text">Motorcart</span>
        <Bell className="app-header-icon" />
      </div>
      <div className="app-search-pill">
        <Search className="h-3 w-3 shrink-0" />
        <span>Creta, Swift, Mumbai…</span>
      </div>
      <div className="app-tabs">
        <span className="app-tab active">Cars</span>
        <span className="app-tab">Pre-Owned</span>
        <span className="app-tab">Auctions</span>
      </div>
      <div className="app-vehicle-card">
        <div className="app-vehicle-img-wrap">
          <img src={CAR_IMG} alt="" className="app-vehicle-img" loading="lazy" />
          <span className="app-badge-verified">Verified</span>
        </div>
        <p className="app-vehicle-title">2024 Hyundai Creta SX(O)</p>
        <p className="app-vehicle-price">{formatCurrency(1485000)}</p>
        <p className="app-vehicle-meta">EMI {formatCurrency(24500)}/mo · Mumbai</p>
      </div>
      <div className="app-bottom-nav">
        <Home className="h-3.5 w-3.5 text-primary" />
        <Search className="h-3.5 w-3.5" />
        <Car className="h-3.5 w-3.5" />
        <Gavel className="h-3.5 w-3.5" />
        <User className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function AppAuctionScreen() {
  return (
    <div className="app-screen app-screen-auction">
      <div className="app-status-bar">
        <span>9:41</span>
        <span className="app-status-icons">●●●</span>
      </div>
      <div className="app-auction-live">
        <span className="app-live-dot" />
        LIVE AUCTION
      </div>
      <p className="app-auction-title">2019 Honda City VX</p>
      <p className="app-auction-bid">{formatCurrency(782000)}</p>
      <p className="app-auction-meta">34 bids · 04:22:18 left</p>
      <div className="app-bid-bar">
        <div className="app-bid-fill" style={{ width: "68%" }} />
      </div>
      <button type="button" className="app-bid-btn">
        Place bid
      </button>
      <p className="app-auction-foot">Bank repo · Mumbai</p>
    </div>
  );
}

export function AppPhoneMockup() {
  return (
    <div className="app-phone-mockup" aria-hidden>
      <PhoneFrame size="sm" className="app-phone-back">
        <AppAuctionScreen />
      </PhoneFrame>
      <PhoneFrame size="lg" className="app-phone-front">
        <AppHomeScreen />
      </PhoneFrame>
      <div className="app-phone-glow" />
    </div>
  );
}
