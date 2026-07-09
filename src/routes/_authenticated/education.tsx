import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Upload, Download, Trash2, Loader2, BookOpen, HelpCircle, Bot, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/education")({
  component: EducationPage,
  head: () => ({ meta: [{ title: "Education — Akash One" }] }),
});

const BUCKET = "user-files";
const NOTES_FOLDER = "notes";

function EducationPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Education</h1>
        <p className="text-muted-foreground mt-2">Notes, quizzes, and an AI study partner — everything to learn faster.</p>
      </div>
      <Tabs defaultValue="notes">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="notes"><BookOpen className="size-4 mr-1.5" />Notes</TabsTrigger>
          <TabsTrigger value="pdf"><FileText className="size-4 mr-1.5" />PDF</TabsTrigger>
          <TabsTrigger value="quiz"><HelpCircle className="size-4 mr-1.5" />Quiz</TabsTrigger>
          <TabsTrigger value="tutor"><Bot className="size-4 mr-1.5" />Tutor</TabsTrigger>
        </TabsList>
        <TabsContent value="notes" className="mt-6"><Notes /></TabsContent>
        <TabsContent value="pdf" className="mt-6"><PDFViewer /></TabsContent>
        <TabsContent value="quiz" className="mt-6"><QuizSection /></TabsContent>
        <TabsContent value="tutor" className="mt-6"><Tutor /></TabsContent>
      </Tabs>
    </div>
  );
}

type NoteFile = { name: string; size?: number; updated?: string };

function useNotes() {
  const [userId, setUserId] = useState<string | null>(null);
  const [files, setFiles] = useState<NoteFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const prefix = userId ? `${userId}/${NOTES_FOLDER}` : null;

  const load = useCallback(async () => {
    if (!prefix) return;
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 200 });
    setLoading(false);
    if (error) return toast.error(error.message);
    setFiles(
      (data ?? [])
        .filter((r) => r.name !== ".keep" && r.id !== null)
        .map((r) => ({ name: r.name, size: (r.metadata as any)?.size, updated: r.updated_at ?? undefined })),
    );
  }, [prefix]);

  useEffect(() => { load(); }, [load]);
  return { userId, prefix, files, loading, reload: load };
}

function Notes() {
  const { prefix, files, loading, reload } = useNotes();
  const inp = useRef<HTMLInputElement>(null);

  const upload = async (fs: FileList | null) => {
    if (!fs || !prefix) return;
    for (const f of Array.from(fs)) {
      const { error } = await supabase.storage.from(BUCKET).upload(`${prefix}/${f.name}`, f, { upsert: true });
      if (error) toast.error(`${f.name}: ${error.message}`);
    }
    toast.success("Uploaded");
    reload();
  };

  const download = async (name: string) => {
    if (!prefix) return;
    const { data, error } = await supabase.storage.from(BUCKET).download(`${prefix}/${name}`);
    if (error || !data) return toast.error(error?.message ?? "Failed");
    const url = URL.createObjectURL(data);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (name: string) => {
    if (!prefix || !confirm(`Delete ${name}?`)) return;
    await supabase.storage.from(BUCKET).remove([`${prefix}/${name}`]);
    reload();
  };

  return (
    <div className="space-y-4">
      <div
        className="glass rounded-2xl p-8 text-center border-2 border-dashed border-border cursor-pointer hover:border-primary/60 transition-colors"
        onClick={() => inp.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files); }}
      >
        <input ref={inp} type="file" multiple hidden onChange={(e) => upload(e.target.files)} />
        <Upload className="size-8 mx-auto mb-2 text-primary" />
        <div className="font-medium">Drop notes here or click to upload</div>
        <div className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT, images — anything.</div>
      </div>
      {loading ? (
        <div className="text-center py-6"><Loader2 className="animate-spin inline" /></div>
      ) : files.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-6">No notes yet.</div>
      ) : (
        <div className="glass rounded-2xl divide-y divide-border">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-3 p-4">
              <FileText className="size-5 text-primary" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.updated ? new Date(f.updated).toLocaleDateString() : ""}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => download(f.name)}><Download className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(f.name)}><Trash2 className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PDFViewer() {
  const { prefix, files, loading } = useNotes();
  const [url, setUrl] = useState<string | null>(null);
  const [current, setCurrent] = useState<string | null>(null);

  const open = async (name: string) => {
    if (!prefix) return;
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(`${prefix}/${name}`, 3600);
    if (error || !data) return toast.error(error?.message ?? "Failed");
    setUrl(data.signedUrl);
    setCurrent(name);
  };

  const pdfs = files.filter((f) => f.name.toLowerCase().endsWith(".pdf"));

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-4">
      <div className="glass rounded-2xl p-3 space-y-1 max-h-[70vh] overflow-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2 py-2">PDFs in your notes</div>
        {loading ? <div className="p-4"><Loader2 className="animate-spin" /></div> : pdfs.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground">Upload a PDF in the Notes tab.</div>
        ) : pdfs.map((f) => (
          <button
            key={f.name}
            onClick={() => open(f.name)}
            className={`w-full text-left p-2 rounded-lg text-sm truncate ${current === f.name ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"}`}
          >
            <FileText className="size-3.5 inline mr-2" />{f.name}
          </button>
        ))}
      </div>
      <div className="glass rounded-2xl overflow-hidden min-h-[70vh]">
        {url ? (
          <iframe src={url} title="PDF viewer" className="w-full h-[70vh]" />
        ) : (
          <div className="flex items-center justify-center h-[70vh] text-muted-foreground text-sm">
            Select a PDF from the list.
          </div>
        )}
      </div>
    </div>
  );
}

type Question = { question: string; options: string[]; answer: number; explanation?: string };

function QuizSection() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return toast.error("Enter a topic");
    setLoading(true); setQuestions([]); setAnswers({}); setSubmitted(false);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          json: true,
          system: "You generate educational multiple-choice quizzes. Always respond with valid JSON.",
          prompt: `Create a ${count}-question multiple-choice quiz on: "${topic}". Return JSON exactly like: {"questions":[{"question":"...","options":["A","B","C","D"],"answer":0,"explanation":"..."}]}. answer is the 0-based index of the correct option.`,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { content } = await res.json();
      const parsed = JSON.parse(content);
      setQuestions(parsed.questions ?? []);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const score = questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6 grid sm:grid-cols-[1fr_140px_auto] gap-3 items-end">
        <div className="space-y-2">
          <Label>Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Photosynthesis basics" />
        </div>
        <div className="space-y-2">
          <Label># Questions</Label>
          <Input type="number" min={3} max={15} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 5)} />
        </div>
        <Button onClick={generate} disabled={loading} className="bg-gradient-brand rounded-full">
          {loading ? <Loader2 className="animate-spin size-4" /> : "Generate quiz"}
        </Button>
      </div>

      {questions.length > 0 && (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="font-semibold mb-3">{i + 1}. {q.question}</div>
              <div className="space-y-2">
                {q.options.map((opt, j) => {
                  const chosen = answers[i] === j;
                  const correct = submitted && j === q.answer;
                  const wrong = submitted && chosen && j !== q.answer;
                  return (
                    <button
                      key={j}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                      className={`w-full text-left p-3 rounded-lg border transition-all
                        ${correct ? "border-emerald-500 bg-emerald-500/10" : ""}
                        ${wrong ? "border-rose-500 bg-rose-500/10" : ""}
                        ${!submitted && chosen ? "border-primary bg-primary/10" : "border-border"}
                        ${!submitted ? "hover:border-primary/60" : ""}
                      `}
                    >
                      <span className="mr-2 font-semibold">{String.fromCharCode(65 + j)}.</span>{opt}
                      {correct && <CheckCircle2 className="inline ml-2 size-4 text-emerald-500" />}
                      {wrong && <XCircle className="inline ml-2 size-4 text-rose-500" />}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <div className="mt-3 text-sm text-muted-foreground border-t border-border pt-3">💡 {q.explanation}</div>
              )}
            </div>
          ))}
          {!submitted ? (
            <Button onClick={() => setSubmitted(true)} className="bg-gradient-brand rounded-full w-full">Submit</Button>
          ) : (
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-sm text-muted-foreground">Your score</div>
              <div className="font-display text-5xl font-bold text-gradient-brand mt-2">{score}/{questions.length}</div>
              <Button onClick={generate} variant="outline" className="mt-4 rounded-full">Try another topic</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Tutor() {
  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!topic.trim()) return;
    setLoading(true); setAnswer("");
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          system: "You are Akash Study, a patient, encouraging tutor. Explain concepts clearly with examples, analogies, and a short summary at the end.",
          prompt: topic,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { content } = await res.json();
      setAnswer(content);
    } catch (e: any) {
      toast.error(e.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6 space-y-3">
        <Label>What do you want to learn?</Label>
        <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Explain recursion with an example" rows={3} />
        <div className="flex gap-2">
          <Button onClick={ask} disabled={loading} className="bg-gradient-brand rounded-full">
            {loading ? <Loader2 className="animate-spin size-4" /> : "Teach me"}
          </Button>
          <Link to="/chat" className="text-sm text-muted-foreground hover:text-foreground self-center ml-2">
            or open the full AI Assistant →
          </Link>
        </div>
      </div>
      {answer && (
        <div className="glass rounded-2xl p-6 whitespace-pre-wrap leading-relaxed text-[15px]">{answer}</div>
      )}
    </div>
  );
}
