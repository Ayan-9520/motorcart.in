import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Droplets, Shield, Wrench } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

const serviceCards = [
  {
    id: "wash",
    title: "Premium Car Wash",
    type: "wash",
    description: "Doorstep foam wash & interior vacuum",
    priceFrom: 499,
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1601362840519-7ecf049038c5?w=400&q=80",
  },
  {
    id: "repair",
    title: "Repair & Maintenance",
    type: "repair",
    description: "Battery, tyres, and general repairs",
    priceFrom: 599,
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1487754183691-f45a7d2d0b34?w=400&q=80",
  },
  {
    id: "detailing",
    title: "Ceramic Detailing",
    type: "detailing",
    description: "Paint protection & premium detailing",
    priceFrom: 4999,
    icon: Car,
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80",
  },
  {
    id: "rsa",
    title: "24×7 Roadside Assistance",
    type: "rsa",
    description: "Pan-India rescue & towing support",
    priceFrom: 999,
    icon: Shield,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
  },
];

export function ServicesSection() {
  return (
    <section className="home-section-alt">
      <div className="container home-stack">
        <SectionHeader
          eyebrow="After-sales"
          title="Service, insurance & RC — all vehicle types"
          description="Wash, repair, detailing, insurance & RC transfer — book trusted partners for cars, bikes & fleet."
          href="/services"
          linkLabel="All services"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="group h-full overflow-hidden hover:shadow-card-hover">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-3">
                    <h3 className="text-sm font-semibold">{service.title}</h3>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{service.description}</p>
                    <p className="text-xs font-medium text-primary">
                      From {formatCurrency(service.priceFrom)}
                    </p>
                    <Button variant="outline" size="sm" className="h-8 w-full text-xs" asChild>
                      <Link to="/services/browse">Book now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
