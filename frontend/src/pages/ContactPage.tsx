import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_TOPICS, SITE_CONTACT, SITE_DESCRIPTION } from "@/content/site-content";
import { MarketingPageBody, MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { setPageMeta } from "@/utils/seo";
import { SITE_NAME } from "@/lib/constants";
import toast from "react-hot-toast";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setPageMeta({
      title: `Contact — ${SITE_NAME}`,
      description: `Contact ${SITE_NAME} for dealer onboarding, finance partnerships, press, and support. ${SITE_CONTACT.responseTime}.`,
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill name, email, and message");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    toast.success("Message received — we'll reply within one business day");
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
  };

  return (
    <MarketingPageShell compact className="site-page">
      <section className="marketing-hero marketing-hero-slim marketing-hero-editorial">
        <div className="marketing-hero-mesh" aria-hidden />
        <MarketingPageBody narrow>
          <p className="site-eyebrow">
            <MessageSquare className="h-3.5 w-3.5" />
            Contact
          </p>
          <h1 className="site-page-title">Get in touch</h1>
          <p className="site-page-lead">
            Dealer onboarding, finance & insurance partnerships, press, or product support.{" "}
            {SITE_CONTACT.responseTime}.
          </p>
          <div className="site-contact-channels">
            <a href={`mailto:${SITE_CONTACT.email}`} className="site-contact-chip">
              <Mail className="h-3.5 w-3.5" />
              {SITE_CONTACT.email}
            </a>
            <a href={`tel:${SITE_CONTACT.phoneTel}`} className="site-contact-chip">
              <Phone className="h-3.5 w-3.5" />
              {SITE_CONTACT.phoneDisplay}
            </a>
            <span className="site-contact-chip site-contact-chip--address">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {SITE_CONTACT.addressLine1}
                <br />
                {SITE_CONTACT.addressLine2}
              </span>
            </span>
            <span className="site-contact-chip">
              <Clock className="h-3.5 w-3.5" />
              {SITE_CONTACT.hours}
            </span>
          </div>
        </MarketingPageBody>
      </section>

      <section className="marketing-section marketing-section-tight pb-24 md:pb-16">
        <MarketingPageBody narrow>
          <Card className="border-border/80 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <form className="contact-form" onSubmit={(e) => void submit(e)} noValidate>
                <div className="contact-form-grid-3">
                  <div className="contact-field">
                    <Label htmlFor="contact-name" className="contact-label">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="contact-input"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <Label htmlFor="contact-email" className="contact-label">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="contact-input"
                      required
                    />
                  </div>
                  <div className="contact-field">
                    <Label htmlFor="contact-phone" className="contact-label">
                      Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 …"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="contact-form-grid-2">
                  <div className="contact-field">
                    <Label htmlFor="contact-company" className="contact-label">
                      Company
                    </Label>
                    <Input
                      id="contact-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                      className="contact-input"
                    />
                  </div>
                  <div className="contact-field">
                    <Label htmlFor="contact-topic" className="contact-label">
                      Topic <span className="text-destructive">*</span>
                    </Label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="contact-select"
                    >
                      {CONTACT_TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <Label htmlFor="contact-message" className="contact-label">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your dealership, partnership, or support need…"
                    className="contact-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div className="contact-form-foot">
                  <Button type="submit" size="sm" className="h-10 rounded-lg px-6 font-semibold" disabled={sending}>
                    <Send className="mr-2 h-4 w-4" />
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Already a partner?{" "}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>
                    {" · "}
                    <Link to="/faqs" className="font-medium text-primary hover:underline">
                      FAQs
                    </Link>
                    {" · "}
                    <Link to="/about" className="font-medium text-primary hover:underline">
                      About us
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          <p className="mt-6 text-center text-xs text-muted-foreground">{SITE_DESCRIPTION}</p>
        </MarketingPageBody>
      </section>
    </MarketingPageShell>
  );
}
