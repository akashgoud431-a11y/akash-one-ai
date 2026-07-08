import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  MessageSquare,
  GraduationCap,
  HeartPulse,
  Search as SearchIcon,
  Cloud,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — Akash One" }] }),
});

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const name = (user?.user_metadata?.full_name as string) ?? user?.email?.split("@")[0] ?? "there";
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const cards = [
    { to: "/chat", icon: MessageSquare, title: "AI Assistant", desc: "Chat, write, code", accent: "from-brand-blue to-brand-purple" },
    { to: "/education", icon: GraduationCap, title: "Education", desc: "Tutor, quizzes, notes" },
    { to: "/healthcare", icon: HeartPulse, title: "Healthcare", desc: "BMI, symptoms, fitness" },
    { to: "/search", icon: SearchIcon, title: "Smart Search", desc: "Web, images, videos" },
    { to: "/storage", icon: Cloud, title: "Cloud Storage", desc: "Files, folders, sharing" },
  ] as const;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-3">
          <Sparkles className="size-3 text-brand-purple" /> Personalized workspace
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          {greet}, <span className="text-gradient-brand">{name}</span>
        </h1>
        <p className="text-muted-foreground mt-2">Everything you need across Akash One — one dashboard.</p>
      </div>

      {/* Quick search */}
      <Link to="/search" className="block glass rounded-2xl p-5 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-3">
          <SearchIcon className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Search everything…</span>
        </div>
      </Link>

      {/* Quick access */}
      <section>
        <h2 className="font-display text-xl font-bold mb-4">Quick access</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className={`p-6 glass rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all group ${c.accent ? "bg-gradient-brand text-primary-foreground border-none" : ""}`}
            >
              <c.icon className={`size-6 mb-4 ${c.accent ? "" : "text-primary"}`} />
              <div className="font-display font-bold text-lg mb-1">{c.title}</div>
              <div className={`text-sm ${c.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {c.desc}
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                Open <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + notifications */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Recent activity</h3>
            <TrendingUp className="size-4 text-muted-foreground" />
          </div>
          <ul className="space-y-3">
            {[
              "Signed in to Akash One",
              "AI Assistant module available",
              "Cloud Storage ready to use",
            ].map((a, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="size-2 rounded-full bg-gradient-brand" />
                <span>{a}</span>
                <span className="ml-auto text-xs text-muted-foreground">just now</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold mb-4">Notifications</h3>
          <div className="text-sm text-muted-foreground">You're all caught up ✨</div>
        </div>
      </div>
    </div>
  );
}
