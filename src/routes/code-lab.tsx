import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/code-lab")({
  head: () => ({
    meta: [
      { title: "Code Lab — Akash One" },
      { name: "description", content: "Ask Akash AI to write, explain, or debug code in any language." },
    ],
  }),
  component: () => (
    <PageShell title="Code Lab" subtitle="Write, explain, or debug code in any language.">
      <AITool
        system="You are a senior software engineer. Return runnable code in fenced blocks with a short explanation. Prefer TypeScript unless the user specifies otherwise."
        placeholder="e.g. Write a React hook that debounces a value…"
        cta="Run"
      />
    </PageShell>
  ),
});
