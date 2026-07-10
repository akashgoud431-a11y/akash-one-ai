import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Akash One" },
      { name: "description", content: "The terms and conditions that govern your use of the Akash One website and services." },
      { property: "og:title", content: "Terms & Conditions — Akash One" },
      { property: "og:description", content: "The terms and conditions that govern your use of Akash One." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalNav />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 10, 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            By accessing or using Akash One (the "Service"), you agree to be bound by
            these Terms & Conditions. If you do not agree, please do not use the Service.
          </p>

          <Section title="1. Use of the service">
            <p>
              You must be at least 13 years old to use Akash One. You agree to use
              the Service only for lawful purposes and in compliance with all
              applicable laws and regulations.
            </p>
          </Section>

          <Section title="2. Accounts">
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account. Notify
              us immediately of any unauthorised use of your account.
            </p>
          </Section>

          <Section title="3. User content">
            <p>
              You retain ownership of any content you upload. By using the Service,
              you grant us a limited license to host, store and display your content
              solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-3">
              You are solely responsible for the content you upload and must ensure
              it does not violate any law or third-party rights.
            </p>
          </Section>

          <Section title="4. Prohibited conduct">
            <ul className="list-disc pl-6 space-y-2">
              <li>Uploading illegal, harmful, abusive or infringing content.</li>
              <li>Attempting to gain unauthorised access to the Service or other accounts.</li>
              <li>Interfering with or disrupting the integrity or performance of the Service.</li>
              <li>Using the Service to send spam or malware.</li>
              <li>Reverse engineering or scraping the platform without written permission.</li>
            </ul>
          </Section>

          <Section title="5. Intellectual property">
            <p>
              All Akash One branding, design, code and content (excluding user content)
              is owned by Akash One and its licensors. You may not copy, modify or
              distribute any part of the Service without written permission.
            </p>
          </Section>

          <Section title="6. Third-party services and ads">
            <p>
              The Service may display advertisements provided by Google AdSense and
              may link to third-party websites. We are not responsible for the content,
              policies or practices of third parties.
            </p>
          </Section>

          <Section title="7. Termination">
            <p>
              We may suspend or terminate your access to the Service at any time if
              you violate these Terms or engage in conduct that we determine, in our
              sole discretion, to be harmful to the Service or its users.
            </p>
          </Section>

          <Section title="8. Disclaimer of warranties">
            <p>
              The Service is provided "as is" and "as available" without warranties of
              any kind, whether express or implied. See our <Link to="/disclaimer" className="text-primary underline">Disclaimer</Link> for more details.
            </p>
          </Section>

          <Section title="9. Limitation of liability">
            <p>
              To the fullest extent permitted by law, Akash One shall not be liable
              for any indirect, incidental, special, consequential or punitive damages
              arising out of or related to your use of the Service.
            </p>
          </Section>

          <Section title="10. Changes to these terms">
            <p>
              We may update these Terms from time to time. Continued use of the Service
              after changes means you accept the updated Terms.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions? Reach us at <a href="mailto:hello@akashone.app" className="text-primary underline">hello@akashone.app</a>.
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
