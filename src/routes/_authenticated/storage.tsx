import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  FolderPlus,
  Folder,
  File as FileIcon,
  Download,
  Trash2,
  Pencil,
  Search as SearchIcon,
  ChevronRight,
  Home,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/storage")({
  component: StoragePage,
  head: () => ({ meta: [{ title: "Cloud Storage — Akash One" }] }),
});

type Entry = {
  name: string;
  id: string | null; // null = folder placeholder
  size?: number;
  updated?: string;
  isFolder: boolean;
};

const BUCKET = "user-files";

function StoragePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [renameTarget, setRenameTarget] = useState<Entry | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const prefix = userId ? [userId, ...path].join("/") : null;

  const load = useCallback(async () => {
    if (!prefix) return;
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list(prefix, {
      limit: 200,
      sortBy: { column: "name", order: "asc" },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    const rows: Entry[] =
      data
        ?.filter((r) => r.name !== ".keep")
        .map((r) => ({
          name: r.name,
          id: r.id,
          size: (r.metadata as any)?.size,
          updated: r.updated_at ?? undefined,
          isFolder: r.id === null,
        })) ?? [];
    setEntries(rows);
  }, [prefix]);

  useEffect(() => { load(); }, [load]);

  const enter = (name: string) => setPath((p) => [...p, name]);
  const upTo = (i: number) => setPath((p) => p.slice(0, i));

  const onUpload = async (files: FileList | null) => {
    if (!files || !prefix) return;
    const items = Array.from(files);
    toast.info(`Uploading ${items.length} file${items.length > 1 ? "s" : ""}…`);
    for (const f of items) {
      const key = `${prefix}/${f.name}`;
      const { error } = await supabase.storage.from(BUCKET).upload(key, f, { upsert: true });
      if (error) toast.error(`${f.name}: ${error.message}`);
    }
    toast.success("Upload complete");
    load();
  };

  const download = async (name: string) => {
    if (!prefix) return;
    const { data, error } = await supabase.storage.from(BUCKET).download(`${prefix}/${name}`);
    if (error || !data) return toast.error(error?.message ?? "Download failed");
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (e: Entry) => {
    if (!prefix) return;
    if (!confirm(`Delete ${e.name}?`)) return;
    if (e.isFolder) {
      const { data: children } = await supabase.storage.from(BUCKET).list(`${prefix}/${e.name}`, { limit: 1000 });
      const paths = children?.map((c) => `${prefix}/${e.name}/${c.name}`) ?? [];
      if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    } else {
      const { error } = await supabase.storage.from(BUCKET).remove([`${prefix}/${e.name}`]);
      if (error) return toast.error(error.message);
    }
    toast.success("Deleted");
    load();
  };

  const doRename = async () => {
    if (!renameTarget || !prefix || !renameValue.trim()) return;
    const from = `${prefix}/${renameTarget.name}`;
    const to = `${prefix}/${renameValue.trim()}`;
    const { error } = await supabase.storage.from(BUCKET).move(from, to);
    if (error) return toast.error(error.message);
    toast.success("Renamed");
    setRenameTarget(null);
    load();
  };

  const createFolder = async () => {
    if (!newFolder.trim() || !prefix) return;
    const key = `${prefix}/${newFolder.trim()}/.keep`;
    const blob = new Blob([""], { type: "text/plain" });
    const { error } = await supabase.storage.from(BUCKET).upload(key, blob, { upsert: true });
    if (error) return toast.error(error.message);
    toast.success("Folder created");
    setNewFolder(""); setNewFolderOpen(false);
    load();
  };

  const filtered = entries.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Cloud Storage</h1>
          <p className="text-muted-foreground mt-1">Your private, encrypted files.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input ref={fileInput} type="file" multiple hidden onChange={(e) => onUpload(e.target.files)} />
          <Button onClick={() => fileInput.current?.click()} className="bg-gradient-brand rounded-full"><Upload className="mr-2 size-4" />Upload</Button>
          <Button variant="outline" onClick={() => setNewFolderOpen(true)} className="rounded-full"><FolderPlus className="mr-2 size-4" />New folder</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button onClick={() => setPath([])} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <Home className="size-4" /> My files
        </button>
        {path.map((seg, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="size-3 text-muted-foreground" />
            <button onClick={() => upTo(i + 1)} className="text-sm hover:text-primary">{seg}</button>
          </span>
        ))}
      </div>

      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search this folder…" className="pl-10 glass border-none" />
      </div>

      <div
        className="glass rounded-2xl min-h-64"
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); onUpload(e.dataTransfer.files); }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="animate-spin mr-2" />Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Drop files here, or use Upload above.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((e) => (
              <div key={e.name} className="flex items-center gap-3 p-4 hover:bg-accent/30 transition-colors">
                <div className="size-10 rounded-lg bg-gradient-brand/10 grid place-items-center shrink-0">
                  {e.isFolder ? <Folder className="size-5 text-primary" /> : <FileIcon className="size-5 text-primary" />}
                </div>
                {e.isFolder ? (
                  <button onClick={() => enter(e.name)} className="flex-1 min-w-0 text-left">
                    <div className="font-medium truncate">{e.name}</div>
                    <div className="text-xs text-muted-foreground">Folder</div>
                  </button>
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{e.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatBytes(e.size)} · {e.updated ? new Date(e.updated).toLocaleDateString() : ""}
                    </div>
                  </div>
                )}
                <div className="flex gap-1 shrink-0">
                  {!e.isFolder && (
                    <Button variant="ghost" size="icon" onClick={() => download(e.name)}><Download className="size-4" /></Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => { setRenameTarget(e); setRenameValue(e.name); }}><Pencil className="size-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(e)}><Trash2 className="size-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!renameTarget} onOpenChange={(v) => !v && setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rename</DialogTitle></DialogHeader>
          <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>Cancel</Button>
            <Button onClick={doRename} className="bg-gradient-brand">Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newFolderOpen} onOpenChange={setNewFolderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New folder</DialogTitle></DialogHeader>
          <Input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="Folder name" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderOpen(false)}>Cancel</Button>
            <Button onClick={createFolder} className="bg-gradient-brand">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function formatBytes(n?: number) {
  if (!n && n !== 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
