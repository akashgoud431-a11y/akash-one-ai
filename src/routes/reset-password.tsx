import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({ meta: [{ title: "Reset password — Akash One" }] }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md glass rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold mb-2">Set a new password</h1>
        <p className="text-sm text-muted-foreground mb-6">Choose something strong you'll remember.</p>
        <div className="space-y-2 mb-4">
          <Label htmlFor="pw">New password</Label>
          <Input id="pw" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button disabled={loading} className="w-full bg-gradient-brand rounded-full h-11">
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Update password"}
        </Button>
      </form>
    </div>
  );
}
