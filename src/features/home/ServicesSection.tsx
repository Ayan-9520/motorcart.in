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
    <section className="section-padding bg-[#f8fafc] dark:bg-muted/20">
      <motion.div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="After-sales"
          title="Automotive Services"
          description="Wash, repair, detailing, and roadside assistance — book trusted providers near you."
          href="/services"
          linkLabel="All services"
        />
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="group h-full overflow-hidden hover:shadow-card-hover">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#16a34a] text-white">
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-medium text-[#16a34a]">
                      From {formatCurrency(service.priceFrom)}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/services?type=${service.type}`}>Book now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
