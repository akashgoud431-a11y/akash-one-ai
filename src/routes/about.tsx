import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Akash One" },
      { name: "description", content: "Learn about Akash One, a unified AI ecosystem founded by Ganhasiri Akash Goud for education, healthcare, cloud storage, and intelligence." },
      { property: "og:title", content: "About Us — Akash One" },
      { property: "og:description", content: "Learn about Akash One and its founder Ganhasiri Akash Goud." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalNav />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About Akash One</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Akash One is a unified AI ecosystem that brings together everything you
            need — education, healthcare, cloud storage, smart search and an AI
            assistant — into one premium, easy-to-use platform.
          </p>
          <p>
            <strong className="text-foreground">Founder:</strong> Akash One was founded and
            created by <strong className="text-foreground">Ganhasiri Akash Goud</strong>,
            with a mission to make powerful AI tools accessible to every learner,
            professional and creator around the world.
          </p>
          <h2 className="text-2xl font-bold text-foreground pt-4">Our mission</h2>
          <p>
            We believe technology should be simple, private and empowering. Akash
            One combines multiple productivity modules under a single account so
            you can spend less time switching tools and more time building,
            learning and growing.
          </p>
          <h2 className="text-2xl font-bold text-foreground pt-4">What we offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI Assistant powered by state-of-the-art language models.</li>
            <li>Education tools including notes, quizzes and an AI study tutor.</li>
            <li>Healthcare utilities such as a BMI calculator, water tracker and reminders.</li>
            <li>Encrypted cloud storage for your personal files.</li>
            <li>Unified search across your files and the web.</li>
          </ul>
          <h2 className="text-2xl font-bold text-foreground pt-4">Contact</h2>
          <p>
            Questions or feedback? Visit our <Link to="/contact" className="text-primary underline">Contact page</Link>.
          </p>
        </div>
      </main>
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
