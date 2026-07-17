import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, GraduationCap, HeartPulse, Code2, Briefcase, Smile, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";

type Msg = { role: "user" | "assistant"; content: string };

const PERSONAS = [
  { id: "tutor", label: "AI Tutor", icon: GraduationCap, system: "You are a patient, encouraging tutor. Explain concepts step-by-step with examples and quick check-questions." },
  { id: "doctor", label: "Health Coach", icon: HeartPulse, system: "You are a friendly health & wellness coach. Give general, non-diagnostic guidance and always recommend consulting a licensed doctor for medical decisions." },
  { id: "coder", label: "Code Buddy", icon: Code2, system: "You are a senior software engineer. Answer with clear, runnable code in fenced blocks and short explanations." },
  { id: "career", label: "Career Coach", icon: Briefcase, system: "You are an executive career coach. Give practical, actionable advice on resumes, interviews, and career growth." },
  { id: "friend", label: "Best Friend", icon: Smile, system: "You are a warm, supportive best friend. Be casual, empathetic, and uplifting." },
] as const;

type PersonaId = typeof PERSONAS[number]["id"];

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Akash AI Chat — Personal Assistants" },
      { name: "description", content: "Chat with specialised AI personas: tutor, health coach, coder, career coach, and more." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [personaId, setPersonaId] = useState<PersonaId>("tutor");
  const persona = PERSONAS.find((p) => p.id === personaId)!;
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: `Hi! I'm your ${persona.label}. How can I help you today?` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: `Hi! I'm your ${persona.label}. How can I help you today?` }]);
  }, [personaId, persona.label]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: persona.system }, ...next],
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Akash AI Chat" subtitle="Choose a persona and start chatting.">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {PERSONAS.map((p) => {
          const active = p.id === personaId;
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setPersonaId(p.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-4 border transition-all ${
                active
                  ? "bg-gradient-brand text-primary-foreground border-transparent shadow-lg shadow-primary/25"
                  : "glass hover:border-primary/40"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-xs font-semibold">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="glass rounded-2xl flex flex-col h-[60vh] min-h-[420px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-brand text-primary-foreground text-sm leading-relaxed whitespace-pre-wrap"
                    : "max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-muted text-foreground text-sm leading-relaxed whitespace-pre-wrap"
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-2xl bg-muted text-sm inline-flex gap-1">
                <Sparkles className="size-4 animate-pulse" /> Thinking…
              </div>
            </div>
          )}
        </div>
        <form onSubmit={send} className="p-3 border-t border-border flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask your ${persona.label.toLowerCase()}…`}
            className="flex-1 px-4 py-3 rounded-xl bg-muted outline-none text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="size-11 shrink-0 rounded-xl bg-gradient-brand text-primary-foreground grid place-items-center shadow-lg shadow-primary/25 disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}
