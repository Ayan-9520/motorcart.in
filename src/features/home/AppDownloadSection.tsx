import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppPhoneMockup } from "./components/AppPhoneMockup";

export function AppDownloadSection() {
  return (
    <section className="home-app-footer border-t border-border">
      <div className="home-app-footer-bg" aria-hidden />
      <div className="container relative py-10 md:py-14">
        <div className="home-app-footer-grid">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="home-app-footer-copy"
          >
            <p className="home-app-footer-eyebrow">
              <Smartphone className="h-4 w-4" />
              Motorcart mobile app
            </p>
            <h2 className="home-app-footer-title">
              Search, bid, finance &amp; manage — from anywhere in India
            </h2>
            <p className="home-app-footer-desc">
              Buyers track auctions and loans. Dealers manage inventory, leads &amp; community posts.
              Bank partners monitor repo lots — one app for the full vehicle ecosystem.
            </p>
            <ul className="home-app-footer-features">
              <li>Live auctions &amp; instant bid alerts</li>
              <li>EMI calculator &amp; lender compare</li>
              <li>Community feed &amp; dealer CRM</li>
              <li>Parts order &amp; service booking</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button size="default" className="h-11 rounded-xl px-6 font-semibold shadow-[var(--shadow-primary)]" asChild>
                <a href="https://play.google.com" target="_blank" rel="noreferrer">
                  Google Play
                </a>
              </Button>
              <Button size="default" variant="outline" className="h-11 rounded-xl px-6" asChild>
                <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                  App Store
                </a>
              </Button>
              <Button size="default" variant="ghost" className="h-11 rounded-xl" asChild>
                <Link to="/community">
                  Explore on web <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="home-app-footer-qr">
              <QrCode className="h-14 w-14 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Scan to download</p>
                <p className="text-xs text-muted-foreground">motorcart.in/app · iOS &amp; Android</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="home-app-footer-visual"
          >
            <AppPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
