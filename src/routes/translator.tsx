import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "AI Translator — Akash One" },
      { name: "description", content: "Translate any text into 50+ languages with Akash AI." },
    ],
  }),
  component: TranslatorPage,
});

const LANGS = ["English","Hindi","Telugu","Tamil","Kannada","Malayalam","Bengali","Marathi","Gujarati","Punjabi","Urdu","Arabic","Spanish","French","German","Italian","Portuguese","Russian","Chinese","Japanese","Korean"];

function TranslatorPage() {
  const [target, setTarget] = useState("Hindi");
  return (
    <PageShell title="AI Translator" subtitle="Translate anything into 20+ languages instantly.">
      <AITool
        system="You are an expert translator. Return only the translated text without any commentary."
        placeholder="Paste text to translate…"
        cta="Translate"
        buildPrompt={(t) => `Translate the following into ${target}. Keep tone and formatting.\n\n${t}`}
        extraControls={
          <div className="flex items-center gap-3 px-2 pt-1">
            <label className="text-sm font-semibold text-muted-foreground">To:</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-muted rounded-lg px-3 py-1.5 text-sm outline-none"
            >
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        }
      />
    </PageShell>
  );
}
