import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppPhoneMockup } from "./components/AppPhoneMockup";
import { SectionHeader } from "./SectionHeader";

export function AppDownloadSection() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container">
        <div className="mc-card overflow-hidden">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="order-2 space-y-4 p-5 md:p-8 lg:order-1">
              <SectionHeader
                eyebrow="Mobile app"
                title="Motorcart in your pocket"
                description="Search, bid, apply for loans, and manage your dealership from anywhere. Available on iOS and Android."
              />
              <div className="flex flex-wrap gap-3">
                <Button size="sm" className="home-section-cta rounded-lg" asChild>
                  <a href="https://play.google.com" target="_blank" rel="noreferrer">
                    Google Play
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="home-section-cta rounded-lg" asChild>
                  <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                    App Store
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
                <QrCode className="h-16 w-16 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Scan to download</p>
                  <p className="text-xs text-muted-foreground">motorcart.in/app</p>
                </div>
              </div>
            </div>
            <div className="app-download-visual order-1 lg:order-2">
              <AppPhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
