import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContentDocPage, DocSection } from "@/components/marketing/ContentDocPage";
import { setPageMeta } from "@/utils/seo";

const ROLES = [
  {
    title: "Senior Full-Stack Engineer",
    location: "Mumbai / Remote (India)",
    type: "Full-time",
    team: "Product Engineering",
  },
  {
    title: "Dealer Success Manager",
    location: "Bangalore, Delhi, Mumbai",
    type: "Full-time",
    team: "Dealer OS",
  },
  {
    title: "DSA / Finance Partnerships Lead",
    location: "Pan-India travel",
    type: "Full-time",
    team: "Fintech",
  },
  {
    title: "Content & Community Manager",
    location: "Remote (India)",
    type: "Full-time",
    team: "Community",
  },
];

export function CareersPage() {
  useEffect(() => {
    setPageMeta({
      title: "Careers — Motorcart.in",
      description: "Join Motorcart — build India's AI-powered automotive ecosystem.",
    });
  }, []);

  return (
    <ContentDocPage
      eyebrow="Careers"
      title="Build the future of auto in India"
      lead="We're growing across engineering, dealer success, finance partnerships, and community — join a team obsessed with vehicles, data, and trust."
      actions={
        <Button className="rounded-xl" asChild>
          <Link to="/contact">Apply via contact form</Link>
        </Button>
      }
    >
      <DocSection title="Open roles">
        <ul className="space-y-4">
          {ROLES.map((role) => (
            <li key={role.title}>
              <Card className="marketing-card border-border/80">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-foreground sm:text-lg">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {role.title}
                      </h3>
                      <p className="mt-1 text-sm text-primary">{role.team}</p>
                    </div>
                    <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold">
                      {role.type}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {role.location}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Don&apos;t see a fit? Email{" "}
          <a href="mailto:careers@motorcart.in" className="font-semibold text-primary hover:underline">
            careers@motorcart.in
          </a>{" "}
          with your CV and what you&apos;d like to build.
        </p>
      </DocSection>

      <DocSection title="Why Motorcart">
        <ul className="list-disc space-y-2 pl-5">
          <li>Work on dealer CRM, auctions, finance, and owner community — one platform</li>
          <li>Hybrid-friendly teams in Mumbai with remote roles across India</li>
          <li>Competitive pay, learning budget, and exposure to OEM & NBFC partners</li>
        </ul>
      </DocSection>
    </ContentDocPage>
  );
}
