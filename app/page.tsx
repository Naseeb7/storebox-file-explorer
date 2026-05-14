"use client";

export default function Home() {
  return (
    <main className="flex h-screen bg-[#1e1e1e] text-white">
      <aside className="w-80 border-r border-zinc-800">Sidebar</aside>

      <section className="flex-1">Editor</section>
    </main>
  );
}
