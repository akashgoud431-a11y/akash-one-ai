import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Akash One" },
      { name: "description", content: "How Akash One collects, uses, protects and shares your personal information across our AI ecosystem." },
      { property: "og:title", content: "Privacy Policy — Akash One" },
      { property: "og:description", content: "How Akash One collects, uses and protects your personal information." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalNav />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 10, 2026</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Akash One ("we", "us", "our") respects your privacy. This Privacy Policy
            explains what information we collect when you use our website and services,
            how we use it, and the choices you have.
          </p>

          <Section title="1. Information we collect">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Account data:</strong> name, email address and authentication credentials when you sign up.</li>
              <li><strong className="text-foreground">Usage data:</strong> pages viewed, features used, device and browser information.</li>
              <li><strong className="text-foreground">Content you upload:</strong> files, notes and messages you store in your account.</li>
              <li><strong className="text-foreground">Cookies:</strong> to keep you signed in and remember preferences.</li>
            </ul>
          </Section>

          <Section title="2. How we use your information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain and improve the Akash One services.</li>
              <li>Authenticate users and secure accounts.</li>
              <li>Respond to enquiries and provide customer support.</li>
              <li>Send service updates and important notices.</li>
              <li>Analyse usage to improve features and performance.</li>
            </ul>
          </Section>

          <Section title="3. Advertising and third-party services">
            <p>
              We use Google AdSense to display advertisements. Google and its partners
              may use cookies to serve ads based on your prior visits to our website or
              other websites. You may opt out of personalised advertising by visiting
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline"> Google Ads Settings</a>.
            </p>
            <p className="mt-3">
              Third parties, including Google, may also use cookies, web beacons and
              similar technologies to collect information about your activity on our
              website and other websites in order to provide you advertising based on
              your browsing activities and interests.
            </p>
          </Section>

          <Section title="4. Data sharing">
            <p>
              We do not sell your personal information. We may share limited data with
              trusted service providers who help us operate the platform (such as
              hosting, analytics and email delivery), and when required by law.
            </p>
          </Section>

          <Section title="5. Data security">
            <p>
              We use industry-standard security measures including encryption in
              transit and access controls to protect your data. No method of
              transmission over the internet is 100% secure, but we work hard to
              safeguard your information.
            </p>
          </Section>

          <Section title="6. Your rights">
            <p>
              You may access, update or delete your account information at any time
              from your account settings, or by contacting us. Depending on your
              location, you may have additional rights under laws such as GDPR or CCPA.
            </p>
          </Section>

          <Section title="7. Children's privacy">
            <p>
              Akash One is not directed to children under 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. We will post the
              revised version on this page and update the "Last updated" date above.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Questions about this Privacy Policy? Reach us at
              <a href="mailto:hello@akashone.app" className="text-primary underline"> hello@akashone.app</a>
              {" "}or through our <Link to="/contact" className="text-primary underline">Contact page</Link>.
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
