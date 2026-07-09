import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notification = { id: string; title: string; body: string; time: string; read?: boolean };

const DEFAULT: Notification[] = [
  { id: "n1", title: "Welcome to Akash One", body: "Your workspace is ready. Explore the modules from the sidebar.", time: "just now" },
  { id: "n2", title: "AI Assistant is live", body: "Ask anything in the AI Assistant tab — powered by Lovable AI.", time: "just now" },
  { id: "n3", title: "Cloud Storage enabled", body: "Upload up to 20MB per file with secure per-user encryption.", time: "just now" },
];

export function NotificationsMenu() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("akash-notifications");
      if (saved) setItems(JSON.parse(saved));
      else {
        setItems(DEFAULT);
        localStorage.setItem("akash-notifications", JSON.stringify(DEFAULT));
      }
    } catch {
      setItems(DEFAULT);
    }
  }, []);

  const unread = items.filter((i) => !i.read).length;

  const markAll = () => {
    const next = items.map((i) => ({ ...i, read: true }));
    setItems(next);
    localStorage.setItem("akash-notifications", JSON.stringify(next));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-purple ring-2 ring-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="font-semibold">Notifications</div>
          {unread > 0 && (
            <button onClick={markAll} className="text-xs text-primary hover:underline">Mark all read</button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">All caught up ✨</div>
          ) : items.map((n) => (
            <div key={n.id} className={`p-3 border-b border-border last:border-none ${n.read ? "opacity-70" : ""}`}>
              <div className="flex items-start gap-2">
                {!n.read && <span className="mt-1.5 size-2 rounded-full bg-brand-purple shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">{n.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
