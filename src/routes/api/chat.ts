import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: ChatMessage[] };
          if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "messages required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "AI is not configured." }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }

          const systemPrompt: ChatMessage = {
            role: "system",
            content:
              "You are Akash AI, the friendly assistant for the Akash One website — a unified AI platform for education, healthcare, cloud storage, search, and intelligence. Answer clearly and concisely. If a user asks how to contact the team, share: email akashgoud431@gmail.com, phone +91 9676977347, or the Contact page at /contact.",
          };

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [systemPrompt, ...messages].slice(-20),
            }),
          });

          if (!res.ok) {
            const status = res.status;
            let msg = "The assistant is temporarily unavailable.";
            if (status === 429) msg = "Too many requests — please try again in a moment.";
            if (status === 402) msg = "AI usage limit reached. Please try again later.";
            return new Response(JSON.stringify({ error: msg }), {
              status,
              headers: { "content-type": "application/json" },
            });
          }

          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const reply = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ reply }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ error: "Unexpected error." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
