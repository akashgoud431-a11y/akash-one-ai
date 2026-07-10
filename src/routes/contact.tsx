import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Akash One" },
      { name: "description", content: "Get in touch with the Akash One team for support, feedback, partnerships, or general enquiries." },
      { property: "og:title", content: "Contact Us — Akash One" },
      { property: "og:description", content: "Reach the Akash One team for support and enquiries." },
      { property: "og:url", content: "https://akash-one-ai.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://akash-one-ai.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent! We'll get back to you shortly.");
    }, 600);
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-brand shadow-lg shadow-primary/25" />
            <span className="font-display text-xl font-bold tracking-tight">Akash One</span>
          </Link>
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Home</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-10">
          Have a question, feedback or partnership idea? We'd love to hear from you.
        </p>

        <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="size-11 rounded-xl bg-gradient-brand grid place-items-center shadow-lg shadow-primary/25">
            <Mail className="size-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email us at</div>
            <a href="mailto:hello@akashone.app" className="font-semibold hover:underline">hello@akashone.app</a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold">Name</span>
              <input required name="name" className="px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary transition-colors" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold">Email</span>
              <input required type="email" name="email" className="px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary transition-colors" />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold">Subject</span>
            <input required name="subject" className="px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary transition-colors" />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold">Message</span>
            <textarea required name="message" rows={6} className="px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary transition-colors resize-y" />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="px-6 py-3 bg-gradient-brand text-primary-foreground font-semibold rounded-xl hover:opacity-95 transition-all shadow-lg shadow-primary/25 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </main>
    </div>
  );
}
