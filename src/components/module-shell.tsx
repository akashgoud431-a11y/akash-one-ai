import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ModuleShell({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: Array<{ icon: LucideIcon; title: string; desc: string }>;
}) {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-10">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Dashboard</Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-3">{title}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="p-6 glass rounded-2xl hover:border-primary/40 transition-all group">
            <div className="size-10 rounded-xl bg-gradient-brand grid place-items-center mb-4 shadow-lg shadow-primary/25">
              <f.icon className="size-5 text-primary-foreground" />
            </div>
            <div className="font-display font-bold text-lg mb-1">{f.title}</div>
            <div className="text-sm text-muted-foreground mb-4">{f.desc}</div>
            <div className="flex items-center text-xs font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
              Coming soon <ArrowRight className="size-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
