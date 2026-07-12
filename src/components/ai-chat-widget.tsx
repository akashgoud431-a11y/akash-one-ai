import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content: "Hello! 👋 How can I help you today?",
};

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error ?? "Something went wrong. Please try again." },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "" }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-gradient-brand text-primary-foreground shadow-2xl shadow-primary/30 grid place-items-center hover:scale-105 transition-transform"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="AI chat assistant"
          className="fixed z-50 bg-background border border-border shadow-2xl flex flex-col
            inset-x-3 bottom-24 top-20 rounded-2xl
            sm:inset-auto sm:right-6 sm:bottom-24 sm:top-auto sm:w-[380px] sm:h-[560px]"
        >
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center shadow-lg shadow-primary/25">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-sm">Akash AI Assistant</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="size-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-gradient-brand text-primary-foreground text-sm leading-relaxed whitespace-pre-wrap"
                      : "max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-muted text-foreground text-sm leading-relaxed whitespace-pre-wrap"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-muted text-sm flex gap-1">
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={send} className="p-3 border-t border-border flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="size-10 shrink-0 rounded-xl bg-gradient-brand text-primary-foreground grid place-items-center shadow-lg shadow-primary/25 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
