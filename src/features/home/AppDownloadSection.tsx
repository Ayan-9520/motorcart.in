import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, QrCode, Smartphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppPhoneMockup } from "./components/AppPhoneMockup";

export function AppDownloadSection() {
  return (
    <section className="home-app-footer home-app-footer--premium border-t border-border/60">
      <div className="home-app-footer-bg home-app-footer-bg--premium" aria-hidden />
      <div className="container relative py-12 md:py-16 lg:py-20">
        <div className="home-app-footer-grid">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="home-app-footer-copy"
          >
            <p className="home-app-footer-eyebrow home-app-footer-eyebrow--premium">
              <Smartphone className="h-4 w-4" />
              Motorcart mobile app
              <span className="home-app-footer-eyebrow-badge">Premium</span>
            </p>
            <h2 className="home-app-footer-title home-app-footer-title--premium">
              Search, bid, finance &amp; manage — from anywhere in India
            </h2>
            <p className="home-app-footer-desc">
              Buyers track auctions and loans. Dealers manage inventory, leads &amp; community posts.
              Bank partners monitor repo lots — one app for the full vehicle ecosystem.
            </p>
            <ul className="home-app-footer-features home-app-footer-features--premium">
              <li>Live auctions &amp; instant bid alerts</li>
              <li>EMI calculator &amp; lender compare</li>
              <li>Community feed &amp; dealer CRM</li>
              <li>Parts order &amp; service booking</li>
            </ul>
            <div className="home-app-store-row">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="home-app-store-btn home-app-store-btn--play"
              >
                <Download className="h-5 w-5 shrink-0 opacity-90" />
                <span>
                  <span className="home-app-store-label">Get it on</span>
                  <span className="home-app-store-name">Google Play</span>
                </span>
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="home-app-store-btn home-app-store-btn--apple"
              >
                <Download className="h-5 w-5 shrink-0 opacity-90" />
                <span>
                  <span className="home-app-store-label">Download on the</span>
                  <span className="home-app-store-name">App Store</span>
                </span>
              </a>
            </div>
            <Button size="default" variant="ghost" className="mt-3 h-11 rounded-xl px-0 font-medium" asChild>
              <Link to="/community">
                Explore on web <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <div className="home-app-footer-qr home-app-footer-qr--premium">
              <div className="home-app-footer-qr-frame">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  Scan to download
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    4.8
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">motorcart.in/app · iOS &amp; Android</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="home-app-footer-visual home-app-footer-visual--premium"
          >
            <AppPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
