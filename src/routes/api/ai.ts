import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

async function verifyBearer(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !anon) return null;
  const supa = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
  const { data, error } = await supa.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await verifyBearer(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const { system, prompt, json } = (await request.json()) as {
          system?: string;
          prompt: string;
          json?: boolean;
        };

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content:
                  (system ??
                    "You are Akash AI, the assistant for Akash One (founded by Ganhasiri Akash Goud).") +
                  (json ? " Respond with ONLY valid JSON, no markdown, no code fences." : ""),
              },
              { role: "user", content: prompt },
            ],
            ...(json ? { response_format: { type: "json_object" } } : {}),
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          return new Response(text, { status: upstream.status });
        }
        const data = await upstream.json();
        const content = data.choices?.[0]?.message?.content ?? "";
        return Response.json({ content });
      },
    },
  },
});
