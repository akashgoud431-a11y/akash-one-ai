import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-brand shadow-lg shadow-primary/25" />
            <span className="font-display text-xl font-bold tracking-tight">Akash One</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Home
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-10 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-3 md:text-lg">{subtitle}</p>}
        </header>
        {children}
      </main>
    </div>
  );
}
