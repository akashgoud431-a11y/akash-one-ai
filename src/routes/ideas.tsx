import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/ideas")({
  head: () => ({
    meta: [
      { title: "Idea Generator — Akash One" },
      { name: "description", content: "Brainstorm startup, content, and product ideas with Akash AI." },
    ],
  }),
  component: () => (
    <PageShell title="Idea Generator" subtitle="Brainstorm startups, content, product features, and creative concepts.">
      <AITool
        system="You are an elite creative strategist. Return 10 numbered ideas, each with a one-line hook and a two-line rationale."
        placeholder="e.g. AI side-projects a solo developer can ship in a weekend…"
        cta="Brainstorm"
      />
    </PageShell>
  ),
});
