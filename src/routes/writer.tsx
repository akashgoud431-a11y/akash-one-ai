import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/writer")({
  head: () => ({
    meta: [
      { title: "AI Writer — Akash One" },
      { name: "description", content: "Draft emails, essays, captions, and posts with Akash AI." },
    ],
  }),
  component: () => (
    <PageShell title="AI Writer" subtitle="Describe what you want and get polished, ready-to-send copy.">
      <AITool
        system="You are a professional writer. Produce polished, well-structured copy in the requested tone. Use markdown when helpful."
        placeholder="e.g. Write a friendly launch email for a new AI product…"
        cta="Write"
      />
    </PageShell>
  ),
});
