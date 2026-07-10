import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Akash One" },
      { name: "description", content: "Important disclaimers regarding the information, AI outputs, health and educational content provided by Akash One." },
      { property: "og:title", content: "Disclaimer — Akash One" },
      { property: "og:description", content: "Important disclaimers about content and AI outputs on Akash One." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalNav />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 10, 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <Section title="General information">
            <p>
              The information provided by Akash One on this website and through the
              Service is for general informational and educational purposes only. All
              information is provided in good faith, however we make no representation
              or warranty of any kind, express or implied, regarding the accuracy,
              adequacy, validity, reliability, availability or completeness of any
              information.
            </p>
          </Section>

          <Section title="AI-generated content">
            <p>
              Akash One uses AI models to generate responses, summaries, quizzes and
              other content. AI outputs may contain errors, inaccuracies or outdated
              information. Always verify important information independently before
              relying on it.
            </p>
          </Section>

          <Section title="Not medical advice">
            <p>
              The Healthcare module (including the BMI calculator, water tracker,
              medicine reminders and health tips) is provided for informational
              purposes only and is <strong className="text-foreground">not a substitute for professional
              medical advice, diagnosis or treatment</strong>. Always seek the advice of a
              qualified healthcare provider with any questions regarding a medical
              condition.
            </p>
          </Section>

          <Section title="Not professional advice">
            <p>
              Content in the Education module and AI Assistant is for learning and
              informational purposes only. It does not constitute legal, financial,
              academic or other professional advice. Consult a qualified professional
              for advice specific to your situation.
            </p>
          </Section>

          <Section title="External links">
            <p>
              Our Service may contain links to external websites that are not provided
              or maintained by us. We do not guarantee the accuracy, relevance,
              timeliness or completeness of any information on these external sites.
            </p>
          </Section>

          <Section title="Advertising">
            <p>
              We display advertisements via Google AdSense. We do not endorse and are
              not responsible for the products, services or content promoted through
              these ads.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              Under no circumstance shall Akash One have any liability for any loss or
              damage of any kind incurred as a result of the use of the Service or
              reliance on any information provided. Your use of the Service and
              reliance on any information is solely at your own risk.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this Disclaimer? Reach us via our
              <Link to="/contact" className="text-primary underline"> Contact page</Link>.
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
      {children}
    </div>
  );
}

function LegalNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-brand shadow-lg shadow-primary/25" />
          <span className="font-display text-xl font-bold tracking-tight">Akash One</span>
        </Link>
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Home</Link>
      </div>
    </nav>
  );
}
