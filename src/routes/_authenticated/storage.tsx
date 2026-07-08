import { createFileRoute } from "@tanstack/react-router";
import { ModuleShell } from "@/components/module-shell";
import { Upload, FolderTree, Share2, Shield, Clock, MousePointer } from "lucide-react";

export const Route = createFileRoute("/_authenticated/storage")({
  component: () => (
    <ModuleShell
      title="Cloud Storage"
      description="Secure, unified storage across all your Akash One modules."
      features={[
        { icon: Upload, title: "Upload Files", desc: "Any file, any size." },
        { icon: MousePointer, title: "Drag & Drop", desc: "Effortless uploads." },
        { icon: FolderTree, title: "Folder Management", desc: "Organize your world." },
        { icon: Share2, title: "File Sharing", desc: "Share safely with anyone." },
        { icon: Shield, title: "Secure Storage", desc: "End-to-end encrypted." },
        { icon: Clock, title: "Recent Files", desc: "Jump right back to work." },
      ]}
    />
  ),
  head: () => ({ meta: [{ title: "Cloud Storage — Akash One" }] }),
});
