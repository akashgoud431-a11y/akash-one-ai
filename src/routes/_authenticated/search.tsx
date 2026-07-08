import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/module-shell";
import { Globe, Image as ImageIcon, Video, Sparkles, Mic, History } from "lucide-react";

export const Route = createFileRoute("/_authenticated/search")({
  component: () => (
    <ModuleShell
      title="Smart Search"
      description="Semantic discovery across the web and your own content."
      features={[
        { icon: Globe, title: "Web Search", desc: "Fast, filtered results." },
        { icon: ImageIcon, title: "Image Search", desc: "Find visuals with AI understanding." },
        { icon: Video, title: "Video Search", desc: "Videos across the internet." },
        { icon: Sparkles, title: "AI Answers", desc: "Direct answers, not just links." },
        { icon: Mic, title: "Voice Search", desc: "Hands-free searching." },
        { icon: History, title: "Search History", desc: "Revisit anything you've searched." },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Search — Akash One" }] }),
});
