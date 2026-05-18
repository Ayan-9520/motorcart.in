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
    <section className="section-padding">
      <motion.div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="Marketplace"
          title="Featured Vehicles"
          description="AI-verified listings with transparent pricing and instant EMI estimates."
          href="/vehicles"
          linkLabel="View all vehicles"
        />
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="group overflow-hidden border-slate-200 hover:shadow-card-hover">
                <Link to={`/vehicles/${vehicle.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      {vehicle.isVerified && (
                        <Badge className="gap-1 bg-[#16a34a] text-white">
                          <ShieldCheck className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {vehicle.aiScore != null && (
                        <Badge variant="outline" className="border-white/30 bg-black/40 text-white">
                          <Sparkles className="h-3 w-3" />
                          {vehicle.aiScore}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-5">
                    <h3 className="line-clamp-1 font-semibold">{vehicle.title}</h3>
                    <p className="text-xl font-bold text-[#16a34a]">{formatCurrency(vehicle.price)}</p>
                    {vehicle.emi != null && (
                      <p className="text-sm text-muted-foreground">
                        EMI from {formatCurrency(vehicle.emi)}/mo
                      </p>
                    )}
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {vehicle.location} · {vehicle.dealerName}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
