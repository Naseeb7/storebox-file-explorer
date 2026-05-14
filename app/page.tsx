"use client";

import Explorer from "@/components/explorer/Explorer";
import Editor from "@/components/editor/Editor";
import { initialData } from "@/data/initialData";

export default function Home() {
  return (
    <main className="flex h-screen bg-background text-foreground">
      <aside className="w-80 border-r border-slate-200 dark:border-slate-800">
        <Explorer data={initialData} />
      </aside>

      <section className="flex-1">
        <Editor />
      </section>
    </main>
  );
}
