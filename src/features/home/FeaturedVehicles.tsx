import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { featuredVehicles } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

export function FeaturedVehicles() {
  return (
    <section className="home-section">
      <div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="Marketplace"
          title="Featured Vehicles"
          description="AI-verified listings with transparent pricing and instant EMI estimates."
          href="/vehicles"
          linkLabel="View all vehicles"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="premium-card group overflow-hidden border-border p-0">
                <Link to={`/vehicles/${vehicle.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="vehicle-card-overlay" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      {vehicle.isVerified && (
                        <Badge className="gap-1 border-0 bg-primary text-primary-foreground">
                          <ShieldCheck className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {vehicle.aiScore != null && (
                        <Badge
                          variant="outline"
                          className="border-primary-foreground/30 bg-foreground/40 text-primary-foreground backdrop-blur-sm"
                        >
                          <Sparkles className="h-3 w-3" />
                          {vehicle.aiScore}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <h3 className="line-clamp-1 font-semibold text-foreground">{vehicle.title}</h3>
                    <p className="text-xl font-bold text-primary">{formatCurrency(vehicle.price)}</p>
                    {vehicle.emi != null && (
                      <p className="text-sm text-muted-foreground">
                        EMI from {formatCurrency(vehicle.emi)}/mo
                      </p>
                    )}
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {vehicle.location} · {vehicle.dealerName}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
