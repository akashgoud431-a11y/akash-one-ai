import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Trash2, Plus, Droplet, Scale, Pill, Sparkles, Minus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/healthcare")({
  component: HealthcarePage,
  head: () => ({ meta: [{ title: "Healthcare — Akash One" }] }),
});

type Reminder = { id: string; name: string; dose: string; time: string };

const HEALTH_TIPS = [
  { title: "Move every hour", body: "Take a 2-minute walk every hour. Micro-movement resets circulation and focus." },
  { title: "Sleep 7–9 hours", body: "Consistent sleep timing matters more than duration alone. Aim for the same wake time daily." },
  { title: "Hydrate first", body: "Drink 500ml of water within 30 minutes of waking. Rehydration boosts cognition immediately." },
  { title: "Protein anchor", body: "Include 20–30g protein at breakfast to stabilize energy and reduce afternoon cravings." },
  { title: "Screen breaks", body: "Follow 20-20-20: every 20 minutes look 20 feet away for 20 seconds to reduce eye strain." },
  { title: "Strength twice a week", body: "Two 30-minute resistance sessions weekly preserve muscle mass and metabolic health." },
  { title: "Sunlight in the morning", body: "10 minutes of morning sunlight anchors your circadian rhythm and improves sleep quality." },
  { title: "Mind your posture", body: "Stack ears over shoulders over hips. Small alignment fixes prevent chronic neck pain." },
];

function HealthcarePage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Healthcare</h1>
        <p className="text-muted-foreground mt-2">Informational tools — always consult a professional for medical advice.</p>
      </div>
      <Tabs defaultValue="bmi">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="bmi"><Scale className="size-4 mr-1.5" />BMI</TabsTrigger>
          <TabsTrigger value="water"><Droplet className="size-4 mr-1.5" />Water</TabsTrigger>
          <TabsTrigger value="meds"><Pill className="size-4 mr-1.5" />Meds</TabsTrigger>
          <TabsTrigger value="tips"><Sparkles className="size-4 mr-1.5" />Tips</TabsTrigger>
        </TabsList>
        <TabsContent value="bmi" className="mt-6"><BMICalculator /></TabsContent>
        <TabsContent value="water" className="mt-6"><WaterTracker /></TabsContent>
        <TabsContent value="meds" className="mt-6"><MedReminders /></TabsContent>
        <TabsContent value="tips" className="mt-6"><HealthTips /></TabsContent>
      </Tabs>
    </div>
  );
}

function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const height = parseFloat(h) || 0;
  const weight = parseFloat(w) || 0;
  let bmi = 0;
  if (height > 0 && weight > 0) {
    bmi = unit === "metric" ? weight / (height / 100) ** 2 : (weight / height ** 2) * 703;
  }
  const cat = !bmi ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  const color = !bmi ? "" : bmi < 18.5 ? "text-blue-500" : bmi < 25 ? "text-emerald-500" : bmi < 30 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex gap-2">
        <Button variant={unit === "metric" ? "default" : "outline"} size="sm" onClick={() => setUnit("metric")}>Metric</Button>
        <Button variant={unit === "imperial" ? "default" : "outline"} size="sm" onClick={() => setUnit("imperial")}>Imperial</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Height ({unit === "metric" ? "cm" : "in"})</Label>
          <Input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder={unit === "metric" ? "175" : "69"} />
        </div>
        <div className="space-y-2">
          <Label>Weight ({unit === "metric" ? "kg" : "lb"})</Label>
          <Input type="number" value={w} onChange={(e) => setW(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} />
        </div>
      </div>
      {bmi > 0 && (
        <div className="text-center py-8 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
          <div className="font-display text-6xl font-bold text-gradient-brand">{bmi.toFixed(1)}</div>
          <div className={`mt-3 font-semibold ${color}`}>{cat}</div>
          <div className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
            Healthy BMI range is 18.5–24.9. BMI is a screening tool, not a diagnosis.
          </div>
        </div>
      )}
    </div>
  );
}

function WaterTracker() {
  const [goal, setGoal] = useState(8);
  const [count, setCount] = useState(0);
  const key = `akash-water-${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setCount(parseInt(saved) || 0);
    const g = localStorage.getItem("akash-water-goal");
    if (g) setGoal(parseInt(g) || 8);
  }, [key]);

  const update = (n: number) => {
    const next = Math.max(0, n);
    setCount(next);
    localStorage.setItem(key, String(next));
  };
  const setG = (n: number) => {
    setGoal(n);
    localStorage.setItem("akash-water-goal", String(n));
  };

  const pct = Math.min(100, (count / goal) * 100);

  return (
    <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">Today</div>
        <div className="font-display text-6xl font-bold text-gradient-brand">{count} <span className="text-2xl text-muted-foreground">/ {goal} cups</span></div>
      </div>
      <Progress value={pct} className="h-3" />
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" size="icon" onClick={() => update(count - 1)}><Minus /></Button>
        <Button onClick={() => update(count + 1)} className="bg-gradient-brand rounded-full h-12 px-6">
          <Droplet className="mr-2" /> Add cup
        </Button>
        <Button variant="outline" size="icon" onClick={() => update(count + 1)}><Plus /></Button>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Label className="whitespace-nowrap">Daily goal</Label>
        <Input type="number" value={goal} onChange={(e) => setG(parseInt(e.target.value) || 1)} className="max-w-24" />
        <span className="text-sm text-muted-foreground">cups (~250ml each)</span>
      </div>
    </div>
  );
}

function MedReminders() {
  const [items, setItems] = useState<Reminder[]>([]);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("08:00");

  useEffect(() => {
    const saved = localStorage.getItem("akash-meds");
    if (saved) try { setItems(JSON.parse(saved)); } catch { /* noop */ }
  }, []);

  const save = (next: Reminder[]) => {
    setItems(next);
    localStorage.setItem("akash-meds", JSON.stringify(next));
  };

  const add = async () => {
    if (!name.trim()) return toast.error("Medicine name required");
    save([...items, { id: crypto.randomUUID(), name, dose, time }]);
    setName(""); setDose("");
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    toast.success("Reminder saved");
  };

  const remove = (id: string) => save(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6 grid sm:grid-cols-4 gap-3 items-end">
        <div className="space-y-2 sm:col-span-2">
          <Label>Medicine</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vitamin D" />
        </div>
        <div className="space-y-2">
          <Label>Dose</Label>
          <Input value={dose} onChange={(e) => setDose(e.target.value)} placeholder="1 tab" />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <Button onClick={add} className="bg-gradient-brand rounded-full sm:col-span-4"><Plus className="mr-2 size-4" />Add reminder</Button>
      </div>
      {items.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">No reminders yet.</div>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <div key={r.id} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-gradient-brand grid place-items-center shrink-0"><Pill className="size-4 text-primary-foreground" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.dose || "—"} · {r.time}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(r.id)}><Trash2 className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HealthTips() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {HEALTH_TIPS.map((t) => (
        <div key={t.title} className="glass rounded-2xl p-5">
          <div className="size-9 rounded-lg bg-gradient-brand grid place-items-center mb-3"><Sparkles className="size-4 text-primary-foreground" /></div>
          <div className="font-display font-bold mb-1">{t.title}</div>
          <div className="text-sm text-muted-foreground">{t.body}</div>
        </div>
      ))}
    </div>
  );
}
