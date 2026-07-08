import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/module-shell";
import { Newspaper, Stethoscope, Pill, Scale, Droplet, Activity, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/_authenticated/healthcare")({
  component: () => (
    <ModuleShell
      title="Healthcare"
      description="Informational health tools — always talk to a professional for medical advice."
      features={[
        { icon: Newspaper, title: "Health Articles", desc: "Curated, up-to-date reads." },
        { icon: Stethoscope, title: "Symptom Checker", desc: "Informational only — not a diagnosis." },
        { icon: Pill, title: "Medicine Info", desc: "Look up common medicines and interactions." },
        { icon: Scale, title: "BMI Calculator", desc: "Quick BMI + healthy-range guidance." },
        { icon: Droplet, title: "Water Intake", desc: "Daily hydration tracker." },
        { icon: Activity, title: "Fitness Tracker", desc: "Log workouts and see trends." },
        { icon: LifeBuoy, title: "First-Aid Guides", desc: "Step-by-step guidance for common issues." },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Healthcare — Akash One" }] }),
});
