import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

export function AITool({
  system,
  placeholder,
  cta = "Generate",
  minRows = 6,
  extraControls,
  buildPrompt,
}: {
  system: string;
  placeholder: string;
  cta?: string;
  minRows?: number;
  extraControls?: React.ReactNode;
  buildPrompt?: (input: string) => string;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/tool", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system,
          prompt: buildPrompt ? buildPrompt(input.trim()) : input.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || data.error) setError(data.error ?? "Something went wrong.");
      else setOutput(data.reply ?? "");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={run} className="glass rounded-2xl p-4 space-y-3">
        {extraControls}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="w-full resize-y bg-transparent outline-none text-base leading-relaxed px-2 py-2"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-lg shadow-primary/25 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Working…" : cta}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 text-destructive px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {output && (
        <div className="glass rounded-2xl p-6 whitespace-pre-wrap leading-relaxed text-[15px]">
          {output}
        </div>
      )}
    </div>
  );
}
