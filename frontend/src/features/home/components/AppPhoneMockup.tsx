import { Bell, Gavel, Heart, Home, Search, Sparkles, Star, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CAR_IMG =
  "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-phone-frame app-phone-frame--premium app-phone-frame-single">
      <div className="app-phone-bezel app-phone-bezel--premium">
        <div className="app-phone-island app-phone-island--premium" />
        <div className="app-phone-screen app-phone-screen--premium">
          <div className="app-phone-screen-shine" aria-hidden />
          {children}
        </div>
        <div className="app-phone-home-indicator app-phone-home-indicator--premium" />
      </div>
    </div>
  );
}

function AppHomeScreen() {
  return (
    <div className="app-screen app-screen-home app-screen-home--premium">
      <div className="app-status-bar app-status-bar--premium">
        <span>9:41</span>
        <span className="app-status-icons">5G ▮▮▮</span>
      </div>
      <div className="app-header app-header--premium">
        <span className="app-logo-mark app-logo-mark--premium">M</span>
        <div className="min-w-0 flex-1">
          <span className="app-logo-text">Motorcart</span>
          <span className="app-logo-sub">India&apos;s auto super-app</span>
        </div>
        <span className="app-header-notif">
          <Bell className="h-3 w-3" />
          <span className="app-header-notif-dot" />
        </span>
      </div>
      <div className="app-search-pill app-search-pill--premium">
        <Search className="h-3 w-3 shrink-0 text-primary" />
        <span>Creta, Swift, Mumbai…</span>
      </div>
      <div className="app-tabs app-tabs--premium">
        <span className="app-tab active">Cars</span>
        <span className="app-tab">Pre-Owned</span>
        <span className="app-tab">Auctions</span>
      </div>
      <div className="app-vehicle-card app-vehicle-card--premium">
        <div className="app-vehicle-img-wrap">
          <img src={CAR_IMG} alt="" className="app-vehicle-img" loading="lazy" />
          <div className="app-vehicle-img-overlay" />
          <span className="app-badge-verified">
            <Sparkles className="mr-0.5 inline h-2 w-2" />
            Verified
          </span>
          <span className="app-badge-rating">
            <Star className="h-2 w-2 fill-amber-400 text-amber-400" />
            4.9
          </span>
        </div>
        <div className="app-vehicle-body">
          <p className="app-vehicle-title">2024 Hyundai Creta SX(O)</p>
          <p className="app-vehicle-price">{formatCurrency(1485000)}</p>
          <div className="app-vehicle-pills">
            <span className="app-pill">EMI {formatCurrency(24500)}/mo</span>
            <span className="app-pill app-pill--muted">Mumbai</span>
          </div>
        </div>
      </div>
      <div className="app-bottom-nav app-bottom-nav--premium">
        <span className="app-nav-item active">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </span>
        <span className="app-nav-item">
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
        </span>
        <span className="app-nav-item">
          <Gavel className="h-3.5 w-3.5" />
          <span>Bid</span>
        </span>
        <span className="app-nav-item">
          <Heart className="h-3.5 w-3.5" />
          <span>Saved</span>
        </span>
        <span className="app-nav-item">
          <User className="h-3.5 w-3.5" />
          <span>You</span>
        </span>
      </div>
    </div>
  );
}

export function AppPhoneMockup() {
  return (
    <div className="app-phone-mockup app-phone-mockup--premium app-phone-mockup--single" aria-hidden>
      <PhoneFrame>
        <AppHomeScreen />
      </PhoneFrame>
    </div>
  );
}
