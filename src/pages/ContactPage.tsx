import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPageMeta } from "@/utils/seo";
import { SITE_NAME } from "@/lib/constants";
import toast from "react-hot-toast";

const TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "dealer", label: "Dealer onboarding" },
  { value: "finance", label: "Finance / NBFC" },
  { value: "press", label: "Press & media" },
  { value: "support", label: "Technical support" },
];

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
      description: "Reach Motorcart for dealer onboarding, partnerships, and platform support.",
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
    toast.success("Message received — we'll reply within 24 hours");
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <div className="contact-page-inner">
        <header className="contact-page-head">
          <div className="flex items-center gap-2 text-primary">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Contact</span>
          </div>
          <h1 className="contact-page-title">Get in touch</h1>
          <p className="contact-page-sub">Dealer onboarding, finance, press, or support — we reply within 24 hours.</p>
        </header>

        <div className="contact-page-channels">
          <a href="mailto:support@motorcart.in" className="contact-channel">
            <Mail className="h-3.5 w-3.5" />
            support@motorcart.in
          </a>
          <a href="tel:18000000000" className="contact-channel">
            <Phone className="h-3.5 w-3.5" />
            1800-XXX-XXXX
          </a>
          <span className="contact-channel">
            <MapPin className="h-3.5 w-3.5" />
            Mumbai, India
          </span>
          <span className="contact-channel">
            <Clock className="h-3.5 w-3.5" />
            Mon–Sat 9–7 IST
          </span>
        </div>

        <Card className="contact-form-card border-border/80 shadow-sm">
          <CardContent className="p-4 sm:p-5">
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
                    {TOPICS.map((t) => (
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
                  placeholder="How can we help?"
                  className="contact-textarea"
                  rows={3}
                  required
                />
              </div>

              <div className="contact-form-foot">
                <Button type="submit" size="sm" className="h-10 rounded-lg px-6 font-semibold" disabled={sending}>
                  <Send className="mr-2 h-4 w-4" />
                  {sending ? "Sending…" : "Send message"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Partner?{" "}
                  <Link to="/login?redirect=/contact" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                  {" · "}
                  <Link to="/faqs" className="font-medium text-primary hover:underline">
                    FAQs
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
