import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — Akash One" }] }),
});

function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setName((data.user?.user_metadata?.full_name as string) ?? "");
    });
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences.</p>
      </div>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold">Profile</h2>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fn">Full name</Label>
          <Input id="fn" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <Button onClick={saveProfile} disabled={saving} className="bg-gradient-brand rounded-full">
          {saving ? "Saving…" : "Save"}
        </Button>
      </section>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-bold">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Dark mode</div>
            <div className="text-sm text-muted-foreground">Switch between light and dark themes.</div>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
        </div>
      </section>

      <section className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-display text-lg font-bold">Notifications, Privacy, Language</h2>
        <p className="text-sm text-muted-foreground">More controls are coming as modules launch.</p>
      </section>
    </div>
  );
}
