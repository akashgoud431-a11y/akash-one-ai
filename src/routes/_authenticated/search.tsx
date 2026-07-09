import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Globe, File as FileIcon, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search — Akash One" }] }),
});

type FileHit = { path: string; name: string };

const BUCKET = "user-files";

function SearchPage() {
  const [q, setQ] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [files, setFiles] = useState<FileHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const searchFiles = async (query: string) => {
    if (!userId) return [];
    const results: FileHit[] = [];
    const walk = async (prefix: string) => {
      const { data } = await supabase.storage.from(BUCKET).list(prefix, { limit: 200 });
      for (const item of data ?? []) {
        if (item.name === ".keep") continue;
        const full = `${prefix}/${item.name}`;
        if (item.id === null) await walk(full);
        else if (item.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({ path: full, name: item.name });
        }
      }
    };
    await walk(userId);
    return results;
  };

  const run = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    setLoading(true); setAiAnswer(""); setFiles([]);
    try {
      const fileHits = await searchFiles(q);
      setFiles(fileHits);

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          system: "You give short, direct answers (3–5 sentences) like a smart search engine result. Use markdown when helpful.",
          prompt: q,
        }),
      });
      if (res.ok) {
        const { content } = await res.json();
        setAiAnswer(content);
      } else {
        toast.error("AI answer unavailable");
      }
    } finally {
      setLoading(false);
    }
  };

  const webLink = `https://www.google.com/search?q=${encodeURIComponent(q)}`;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Smart Search</h1>
      <p className="text-muted-foreground mb-6">Search the web, your files, and get an AI answer — all at once.</p>

      <form onSubmit={run} className="glass rounded-2xl p-2 flex items-center gap-2 mb-6">
        <SearchIcon className="size-5 text-muted-foreground ml-3 shrink-0" />
        <Input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search anything…"
          className="flex-1 border-none bg-transparent focus-visible:ring-0 text-base"
        />
        <Button type="submit" disabled={loading} className="bg-gradient-brand rounded-xl">
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Search"}
        </Button>
      </form>

      {aiAnswer && (
        <section className="glass rounded-2xl p-6 mb-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-purple mb-2">AI Answer</div>
          <div className="whitespace-pre-wrap leading-relaxed text-[15px]">{aiAnswer}</div>
        </section>
      )}

      {files.length > 0 && (
        <section className="glass rounded-2xl p-6 mb-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">Your files ({files.length})</div>
          <div className="space-y-2">
            {files.map((f) => (
              <div key={f.path} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40">
                <FileIcon className="size-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{f.path}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {q && (
        <a href={webLink} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-3 hover:border-primary/40 transition-all">
          <Globe className="size-5 text-primary" />
          <div className="flex-1">
            <div className="font-semibold">Search "{q}" on the web</div>
            <div className="text-xs text-muted-foreground">Opens Google in a new tab</div>
          </div>
          <ExternalLink className="size-4 text-muted-foreground" />
        </a>
      )}
    </div>
  );
}
