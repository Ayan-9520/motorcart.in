import { Smartphone, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

export function AppDownloadSection() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mc-card overflow-hidden">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 p-8 md:p-12">
              <SectionHeader
                eyebrow="Mobile app"
                title="Motorcart in your pocket"
                description="Search, bid, apply for loans, and manage your dealership from anywhere. Available on iOS and Android."
              />
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-xl" asChild>
                  <a href="https://play.google.com" target="_blank" rel="noreferrer">
                    Google Play
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl" asChild>
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
            <div className="relative flex items-center justify-center bg-secondary p-8 lg:p-12">
              <div className="relative">
                <div className="flex h-[320px] w-[160px] items-center justify-center rounded-[2rem] border-4 border-border bg-card shadow-[var(--shadow-card-hover)]">
                  <Smartphone className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute -right-8 top-12 hidden h-[280px] w-[140px] items-center justify-center rounded-[1.75rem] border-4 border-primary/30 bg-card/80 shadow-lg md:flex">
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
