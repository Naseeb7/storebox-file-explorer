"use client";

import Explorer from "@/components/explorer/Explorer";
import Toolbar from "@/components/explorer/Toolbar";
import Editor from "@/components/editor/Editor";
import { initialData } from "@/data/initialData";
import { useState } from "react";
import { ExplorerNode } from "@/types/explorer";
import { addNode, deleteNode, renameNode } from "@/utils/explorerTree";

export default function Home() {
  const [tree, setTree] = useState(initialData);

  const handleCreateFile = () => {
    const name = window.prompt("File name?");
    if (!name?.trim()) {
      return;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "file",
      content: "",
    };

    setTree((currentTree) => [...currentTree, node]);
  };

  const handleCreateFolder = () => {
    const name = window.prompt("Folder name?");
    if (!name?.trim()) {
      return;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "folder",
      children: [],
    };

    setTree((currentTree) => [...currentTree, node]);
  };

  const handleAddFileToFolder = (folderId: string) => {
    const name = window.prompt("File name?");
    if (!name?.trim()) {
      return;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "file",
      content: "",
    };

    setTree((currentTree) => addNode(currentTree, folderId, node));
  };

  const handleAddFolderToFolder = (folderId: string) => {
    const name = window.prompt("Folder name?");
    if (!name?.trim()) {
      return;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "folder",
      children: [],
    };

    setTree((currentTree) => addNode(currentTree, folderId, node));
  };

  const handleRenameNode = (nodeId: string) => {
    const name = window.prompt("New name?");
    if (!name?.trim()) {
      return;
    }
    setTree((currentTree) => renameNode(currentTree, nodeId, name.trim()));
  };

  const handleDeleteNode = (nodeId: string) => {
    setTree((currentTree) => deleteNode(currentTree, nodeId));
  };

  return (
    <main className="flex h-screen bg-background text-foreground">
      <aside className="w-80 border-r border-slate-200 dark:border-slate-800">
        <Toolbar
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
        />
        <Explorer
          data={tree}
          onAddFile={handleAddFileToFolder}
          onAddFolder={handleAddFolderToFolder}
          onRename={handleRenameNode}
          onDelete={handleDeleteNode}
        />
      </aside>

      <section className="flex-1">
        <Editor />
      </section>
    </main>
  );
}
