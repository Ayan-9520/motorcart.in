import { Smartphone, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

export function AppDownloadSection() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container">
        <div className="mc-card overflow-hidden">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div className="space-y-4 p-5 md:p-8">
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
                <QrCode className="h-16 w-16 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Scan to download</p>
                  <p className="text-xs text-muted-foreground">motorcart.in/app</p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-secondary p-5 lg:p-8">
              <div className="relative">
                <div className="flex h-[220px] w-[110px] items-center justify-center rounded-[1.5rem] border-[3px] border-border bg-card shadow-[var(--shadow-card-hover)]">
                  <Smartphone className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -right-6 top-8 hidden h-[190px] w-[100px] items-center justify-center rounded-[1.25rem] border-[3px] border-primary/30 bg-card/80 shadow-lg md:flex">
                  <div className="text-center text-xs text-muted-foreground">
                    <p className="font-semibold text-primary">Live</p>
                    <p>Auctions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
