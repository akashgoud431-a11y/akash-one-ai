import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles, Bot, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Assistant — Akash One" }] }),
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const body = await res.text();
        if (res.status === 429) toast.error("Rate limit hit — try again shortly.");
        else if (res.status === 402) toast.error("AI credits exhausted. Add credits in Cloud settings.");
        else toast.error(body || "Chat failed");
        setStreaming(false);
        setMessages(next);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages([...next, { role: "assistant", content: assistant }]);
            }
          } catch {
            // ignore parse errors on keep-alive lines
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message ?? "Chat failed");
    } finally {
      setStreaming(false);
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="border-b border-border px-6 py-4 flex items-center gap-3">
        <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center shadow-lg shadow-primary/25">
          <Bot className="size-4 text-primary-foreground" />
        </div>
        <div>
          <div className="font-display font-bold">Akash AI Assistant</div>
          <div className="text-xs text-muted-foreground">Powered by Lovable AI</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="size-14 mx-auto rounded-2xl bg-gradient-brand grid place-items-center shadow-lg shadow-primary/25 mb-4">
                <Sparkles className="size-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">How can I help today?</h2>
              <p className="text-muted-foreground mb-8">Ask me anything — writing, coding, learning, brainstorming.</p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {[
                  "Explain quantum computing simply",
                  "Draft a professional email",
                  "Write a Python web scraper",
                  "Ideas for a weekend project",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="p-4 text-left text-sm glass rounded-xl hover:border-primary/40 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`size-8 shrink-0 rounded-full grid place-items-center ${m.role === "user" ? "bg-secondary" : "bg-gradient-brand"}`}>
                {m.role === "user" ? <UserIcon className="size-4" /> : <Bot className="size-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[85%] ${m.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5" : ""}`}>
                <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {m.content || (streaming && i === messages.length - 1 ? <span className="text-muted-foreground italic">Thinking…</span> : null)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto flex items-end gap-2 glass rounded-2xl p-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Message Akash AI…"
            rows={1}
            className="flex-1 min-h-11 max-h-40 border-none focus-visible:ring-0 bg-transparent resize-none"
          />
          <Button onClick={send} disabled={streaming || !input.trim()} size="icon" className="bg-gradient-brand shrink-0 rounded-xl">
            {streaming ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
