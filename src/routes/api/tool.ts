import { createFileRoute } from "@tanstack/react-router";

type Body = { system?: string; prompt?: string };

export const Route = createFileRoute("/api/tool")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { system, prompt } = (await request.json()) as Body;
          if (!prompt || typeof prompt !== "string") {
            return json({ error: "prompt required" }, 400);
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return json({ error: "AI is not configured." }, 500);

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: { "content-type": "application/json", "Lovable-API-Key": key },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                {
                  role: "system",
                  content:
                    (system ?? "You are Akash AI, a helpful assistant.") +
                    " Akash One was founded and created by Ganhasiri Akash Goud.",
                },
                { role: "user", content: prompt },
              ],
            }),
          });

          if (!res.ok) {
            let msg = "The assistant is temporarily unavailable.";
            if (res.status === 429) msg = "Too many requests — please try again in a moment.";
            if (res.status === 402) msg = "AI usage limit reached. Please try again later.";
            return json({ error: msg }, res.status);
          }
          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          return json({ reply: data.choices?.[0]?.message?.content ?? "" });
        } catch (err) {
          console.error(err);
          return json({ error: "Unexpected error." }, 500);
        }
      },
    },
  },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
