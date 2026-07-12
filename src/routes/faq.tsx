import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Akash One" },
      { name: "description", content: "Frequently asked questions about Akash One — modules, privacy, pricing, and getting started." },
      { property: "og:title", content: "FAQ — Akash One" },
      { property: "og:description", content: "Frequently asked questions about Akash One." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/faq" }],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "What is Akash One?", a: "Akash One is a unified AI ecosystem covering education, healthcare, cloud storage, search, and intelligence — all in one platform." },
  { q: "Is my data truly private?", a: "All data is end-to-end encrypted and only accessible with your credentials. We do not train on your content by default." },
  { q: "Can I use Akash AI with my own data?", a: "Yes. Akash AI supports secure local context injection and custom prompt configuration for business-specific use cases." },
  { q: "What modules are available today?", a: "AI Assistant, EduFlow, HealthSync, Smart Search, and Cloud Vault — with more launching every quarter." },
  { q: "Is there a free plan?", a: "Yes. Every account starts free with generous AI quotas so you can explore before upgrading." },
  { q: "How do I contact support?", a: "Email akashgoud431@gmail.com, call +91 9676977347, or use our Contact page." },
];

function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-brand shadow-lg shadow-primary/25" />
            <span className="font-display text-xl font-bold tracking-tight">Akash One</span>
          </Link>
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Home</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-10">Everything you need to know about Akash One.</p>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="glass rounded-2xl px-6 border-none">
              <AccordionTrigger className="font-semibold text-left hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
