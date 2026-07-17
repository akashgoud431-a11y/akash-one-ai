import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "AI Summarizer — Akash One" },
      { name: "description", content: "Turn long articles, notes, and documents into crisp summaries." },
    ],
  }),
  component: () => (
    <PageShell title="AI Summarizer" subtitle="Paste any text and get a clean, structured summary in seconds.">
      <AITool
        system="You are a concise summarizer. Produce a short abstract, then 5 crisp bullet points of key takeaways."
        placeholder="Paste an article, notes, or a transcript…"
        cta="Summarize"
        buildPrompt={(t) => `Summarize this content:\n\n${t}`}
      />
    </PageShell>
  ),
});
