import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HERO_STATS } from "@/features/home/data/homepage-data";
import { PartnerLogoMarquee } from "@/features/home/components/PartnerLogoMarquee";

export function HomeTrustBand() {
  return (
    <section className="border-b border-border bg-muted/20 py-4 md:py-6">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="hero-trust-band"
        >
          <div className="hero-stats-row">
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="hero-stat-cell"
              >
                <Link to={stat.href} className="hero-stat-link group">
                  <p className="text-base font-bold tracking-tight text-foreground group-hover:text-primary sm:text-lg">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground">{stat.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hero-partners-block">
            <p className="hero-partners-label">Trusted partners &amp; brands</p>
            <PartnerLogoMarquee />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
