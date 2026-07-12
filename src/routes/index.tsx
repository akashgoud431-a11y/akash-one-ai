import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Sparkles,
  Search,
  GraduationCap,
  HeartPulse,
  Bot,
  Cloud,
  ArrowRight,
  Menu,
  X,
  Twitter,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import aiHero from "@/assets/ai-hero.jpg";
import { AdsterraNative, AdsterraResponsiveBanner } from "@/components/adsterra-ads";
import { AIChatWidget } from "@/components/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.getElementById("modules");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-brand shadow-lg shadow-primary/25" />
            <span className="font-display text-xl font-bold tracking-tight">Akash One</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#modules" className="hover:text-foreground transition-colors">Modules</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Trust</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="md:hidden p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border/60 px-6 py-4 flex flex-col gap-3 bg-background">
            <a href="#modules" onClick={() => setMobileOpen(false)}>Modules</a>
            <a href="#stats" onClick={() => setMobileOpen(false)}>Trust</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="platform" className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] max-w-6xl aspect-square bg-gradient-to-b from-primary/15 via-accent/10 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand-purple animate-pulse" />
            Powered by Lovable AI
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Akash One — Everything You Need.{" "}
            <span className="text-gradient-brand">One Platform.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A unified AI ecosystem for education, health, cloud, and intelligence.
            Scaled for humans, powered by tomorrow.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-10">
            <div className="flex items-center p-2 glass rounded-2xl shadow-2xl">
              <Search className="size-5 text-muted-foreground ml-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the ecosystem…"
                className="w-full px-4 py-4 bg-transparent outline-none text-base"
              />
              <button
                type="submit"
                className="shrink-0 px-5 md:px-8 py-3.5 bg-gradient-brand text-primary-foreground font-semibold rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/25"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Floating AI Chat Assistant */}
      <AIChatWidget />

      {/* Modules */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-5">
          {/* AI Assistant hero card */}
          <div className="md:col-span-2 p-8 glass rounded-3xl group hover:border-primary/40 transition-all">
            <div className="flex flex-col h-full justify-between gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3 block">
                  Intelligence
                </span>
                <h3 className="font-display text-3xl font-bold mb-3">Akash AI Assistant</h3>
                <p className="text-muted-foreground max-w-md">
                  Next-generation language models tuned for professional workflows and creative reasoning.
                </p>
              </div>
              <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-border/60">
                <img src={aiHero} alt="Akash AI dashboard preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Cloud Vault */}
          <div className="p-8 bg-gradient-brand rounded-3xl shadow-2xl shadow-primary/25 text-primary-foreground flex flex-col justify-between">
            <div>
              <Cloud className="size-8 mb-4 opacity-90" />
              <h3 className="font-display text-2xl font-bold mb-2">Cloud Vault</h3>
              <p className="text-primary-foreground/80 text-sm">
                Encrypted decentralized storage for your most sensitive data.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <div className="size-20 rounded-full border-4 border-white/25 flex items-center justify-center font-display text-2xl font-bold italic">
                AV
              </div>
            </div>
          </div>

          <ModuleCard icon={GraduationCap} title="EduFlow" desc="Adaptive learning paths tailored to your career goals and skill gaps." />
          <ModuleCard icon={HeartPulse} title="HealthSync" desc="Real-time biometric monitoring and AI-driven preventative diagnostics." />
          <ModuleCard icon={Bot} title="Smart Search" desc="Context-aware discovery across the entire web and your internal files." />
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            ["4M+", "Active Users"],
            ["99.9%", "Uptime SLA"],
            ["50ms", "AI Latency"],
            ["128+", "Countries"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">{n}</div>
              <div className="text-background/60 text-xs md:text-sm uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <AdsterraResponsiveBanner />
      </div>


      {/* Testimonials */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-14">
          Loved by industry leaders
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Testimonial
            quote="Akash One has fundamentally changed how our remote team manages sensitive medical records while collaborating with AI. It's the infrastructure of the future."
            name="Dr. Sarah Chen"
            title="CTO, OmniHealth"
          />
          <Testimonial
            quote="The unified search and storage modules saved us hundreds of hours in manual filing. We finally have a single source of truth."
            name="Marcus Thorne"
            title="Lead Architect, VeloCloud"
          />
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <AdsterraNative />
      </div>



      {/* FAQ */}
      <section id="faq" className="py-20 md:py-24 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Common questions</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="glass rounded-2xl px-6 border-none">
              <AccordionTrigger className="font-semibold text-left hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 -z-10" />
          <Sparkles className="size-8 mx-auto mb-4 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Start with Akash One today</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            One platform. Every module you need. Sign up in seconds.
          </p>
          <a href="#modules">
            <Button size="lg" className="bg-gradient-brand text-primary-foreground rounded-full h-12 px-8 shadow-lg shadow-primary/25 hover:opacity-95">
              Explore modules <ArrowRight className="ml-2 size-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-6 bg-gradient-brand rounded-md" />
              <span className="font-display text-lg font-bold tracking-tight">Akash One</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 text-sm">
              Pioneering the next generation of unified digital infrastructure for education, health, and beyond.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-full glass grid place-items-center hover:bg-accent transition-colors">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm">Product</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#modules" className="hover:text-foreground">Intelligence</a></li>
              <li><a href="#modules" className="hover:text-foreground">HealthSync</a></li>
              <li><a href="#modules" className="hover:text-foreground">Cloud Vault</a></li>
              <li><a href="#modules" className="hover:text-foreground">EduFlow</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm">Company</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground pb-4">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
        </div>
        <div className="max-w-7xl mx-auto text-center border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground">© 2026 Akash One Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-8 glass rounded-3xl hover:border-primary/40 hover:shadow-xl transition-all group">
      <div className="size-11 rounded-xl bg-gradient-brand grid place-items-center mb-5 shadow-lg shadow-primary/25">
        <Icon className="size-5 text-primary-foreground" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
        Explore <ArrowRight className="ml-1 size-4" />
      </div>
    </div>
  );
}

function Testimonial({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <div className="p-8 md:p-10 glass rounded-3xl">
      <p className="text-lg italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-full bg-gradient-brand" />
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Is my data truly private?",
    a: "All Akash One data is end-to-end encrypted. Your module data is only accessible with your credentials — we do not train on your content by default.",
  },
  {
    q: "Can I use the AI with my own datasets?",
    a: "Yes. The Akash AI module allows secure local context injection and custom prompt configuration for business-specific use cases.",
  },
  {
    q: "What modules are available today?",
    a: "AI Assistant, Education, Healthcare, Search, and Cloud Storage — all under a single account, with more modules launching every quarter.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Every account starts free with generous AI quotas so you can explore the entire ecosystem before upgrading.",
  },
];
