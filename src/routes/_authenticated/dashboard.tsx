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
  Droplet,
  FileText,
  Pill,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — Akash One" }] }),
});

const BUCKET = "user-files";

type RecentFile = { name: string; path: string; updated?: string };

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [waterCount, setWaterCount] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8);
  const [medCount, setMedCount] = useState(0);
  const [recent, setRecent] = useState<RecentFile[]>([]);
  const [quizzesTaken, setQuizzesTaken] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const key = `akash-water-${new Date().toISOString().slice(0, 10)}`;
        setWaterCount(parseInt(localStorage.getItem(key) || "0"));
        setWaterGoal(parseInt(localStorage.getItem("akash-water-goal") || "8"));
        try {
          setMedCount(JSON.parse(localStorage.getItem("akash-meds") || "[]").length);
        } catch { /* noop */ }
        setQuizzesTaken(parseInt(localStorage.getItem("akash-quizzes") || "0"));

        const files: RecentFile[] = [];
        const walk = async (prefix: string, depth = 0) => {
          if (depth > 2) return;
          const { data: items } = await supabase.storage.from(BUCKET).list(prefix, { limit: 50, sortBy: { column: "updated_at", order: "desc" } });
          for (const it of items ?? []) {
            if (it.name === ".keep") continue;
            const full = `${prefix}/${it.name}`;
            if (it.id === null) await walk(full, depth + 1);
            else files.push({ name: it.name, path: full, updated: it.updated_at ?? undefined });
          }
        };
        await walk(data.user.id);
        files.sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""));
        setRecent(files.slice(0, 5));
      }
    });
  }, []);

  const name = (user?.user_metadata?.full_name as string) ?? user?.email?.split("@")[0] ?? "there";
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const cards: Array<{ to: string; icon: any; title: string; desc: string; accent?: boolean }> = [
    { to: "/chat", icon: MessageSquare, title: "AI Assistant", desc: "Chat, write, code", accent: true },
    { to: "/education", icon: GraduationCap, title: "Education", desc: "Notes, quizzes, tutor" },
    { to: "/healthcare", icon: HeartPulse, title: "Healthcare", desc: "BMI, water, meds" },
    { to: "/search", icon: SearchIcon, title: "Smart Search", desc: "Web, files, AI answers" },
    { to: "/storage", icon: Cloud, title: "Cloud Storage", desc: "Files, folders, sharing" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-3">
          <Sparkles className="size-3 text-brand-purple" /> Personalized workspace
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          {greet}, <span className="text-gradient-brand">{name}</span>
        </h1>
        <p className="text-muted-foreground mt-2">Everything you need across Akash One — one dashboard.</p>
      </div>

      <Link to="/search" className="block glass rounded-2xl p-5 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-3">
          <SearchIcon className="size-5 text-muted-foreground" />
          <span className="text-muted-foreground">Search everything…</span>
        </div>
      </Link>

      <section>
        <h2 className="font-display text-xl font-bold mb-4">Quick access</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link
              key={c.to} to={c.to}
              className={`p-6 glass rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all group ${c.accent ? "bg-gradient-brand text-primary-foreground border-none" : ""}`}
            >
              <c.icon className={`size-6 mb-4 ${c.accent ? "" : "text-primary"}`} />
              <div className="font-display font-bold text-lg mb-1">{c.title}</div>
              <div className={`text-sm ${c.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.desc}</div>
              <div className="mt-4 flex items-center text-sm font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                Open <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-4">
        <Link to="/healthcare" className="glass rounded-2xl p-6 hover:border-primary/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold flex items-center gap-2"><HeartPulse className="size-4 text-primary" />Health today</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center gap-1"><Droplet className="size-3.5 text-primary" />Water</span>
                <span className="text-muted-foreground">{waterCount}/{waterGoal}</span>
              </div>
              <Progress value={Math.min(100, (waterCount / waterGoal) * 100)} className="h-2" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Pill className="size-4 text-primary" />
              <span>{medCount} reminder{medCount === 1 ? "" : "s"} active</span>
            </div>
          </div>
        </Link>

        <Link to="/education" className="glass rounded-2xl p-6 hover:border-primary/40 transition-all">
          <h3 className="font-display font-bold flex items-center gap-2 mb-3"><GraduationCap className="size-4 text-primary" />Education</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Notes stored</span><span className="font-semibold">{recent.length}+</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Quizzes taken</span><span className="font-semibold">{quizzesTaken}</span></div>
            <div className="text-muted-foreground text-xs pt-2 border-t border-border">Open to upload notes or run a quiz →</div>
          </div>
        </Link>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-bold flex items-center gap-2 mb-3"><TrendingUp className="size-4 text-primary" />Recent activity</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gradient-brand" />Signed in to Akash One</li>
            <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gradient-brand" />{recent.length} file{recent.length === 1 ? "" : "s"} in cloud storage</li>
            <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gradient-brand" />All modules ready</li>
          </ul>
        </div>
      </div>

      <section className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold flex items-center gap-2"><FileText className="size-4 text-primary" />Recent files</h3>
          <Link to="/storage" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="text-sm text-muted-foreground py-6 text-center">No files yet — head to Cloud Storage to upload.</div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((f) => (
              <div key={f.path} className="flex items-center gap-3 py-3">
                <FileText className="size-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{f.path.split("/").slice(1, -1).join("/") || "root"}</div>
                </div>
                <div className="text-xs text-muted-foreground">{f.updated ? new Date(f.updated).toLocaleDateString() : ""}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
