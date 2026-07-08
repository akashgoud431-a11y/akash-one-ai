import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/module-shell";
import { Bot, BookOpen, HelpCircle, FileText, Layers, Code2, Languages, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/education")({
  component: () => (
    <ModuleShell
      title="Education"
      description="Adaptive learning powered by AI — everything you need to level up."
      features={[
        { icon: Bot, title: "AI Tutor", desc: "One-on-one tutoring on any topic." },
        { icon: BookOpen, title: "Notes", desc: "Smart, searchable notes with AI summaries." },
        { icon: HelpCircle, title: "Quiz Generator", desc: "Auto-generate quizzes from any material." },
        { icon: FileText, title: "PDF Summarizer", desc: "Turn long PDFs into digestible summaries." },
        { icon: Layers, title: "Flashcards", desc: "Spaced-repetition flashcards from your notes." },
        { icon: Code2, title: "Programming Lessons", desc: "Interactive coding lessons and exercises." },
        { icon: Languages, title: "Language Learning", desc: "Conversational practice with an AI partner." },
        { icon: TrendingUp, title: "Progress Tracking", desc: "See your growth across every subject." },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Education — Akash One" }] }),
});
