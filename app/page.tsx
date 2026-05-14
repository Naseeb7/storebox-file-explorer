"use client";

import Explorer from "@/components/explorer/Explorer";
import Toolbar from "@/components/explorer/Toolbar";
import Editor from "@/components/editor/Editor";
import { initialData } from "@/data/initialData";
import { useEffect, useMemo, useState } from "react";
import { ExplorerNode } from "@/types/explorer";
import {
  addNode,
  deleteNode,
  findNodeById,
  renameNode,
  updateNodeContent,
} from "@/utils/explorerTree";

const TREE_STORAGE_KEY = "storebox-explorer-tree";

export default function Home() {
  const [tree, setTree] = useState<ExplorerNode[]>(initialData);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedTree = window.localStorage.getItem(TREE_STORAGE_KEY);
      if (!savedTree) {
        return;
      }

      const parsedTree = JSON.parse(savedTree) as ExplorerNode[];
      if (!Array.isArray(parsedTree)) {
        return;
      }

      queueMicrotask(() => {
        setTree(parsedTree);
      });
    } catch {
      // Ignore invalid localStorage data.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(tree));
    } catch {
      // Ignore persistence failures (e.g. storage blocked).
    }
  }, [tree]);

  const selectedFile = useMemo(() => {
    if (!selectedFileId) {
      return null;
    }
    const node = findNodeById(tree, selectedFileId);
    return node?.type === "file" ? node : null;
  }, [selectedFileId, tree]);

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

  const handleAddFileToFolder = (folderId: string): boolean => {
    const name = window.prompt("File name?");
    if (!name?.trim()) {
      return false;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "file",
      content: "",
    };

    setTree((currentTree) => addNode(currentTree, folderId, node));
    return true;
  };

  const handleAddFolderToFolder = (folderId: string): boolean => {
    const name = window.prompt("Folder name?");
    if (!name?.trim()) {
      return false;
    }

    const node: ExplorerNode = {
      id: crypto.randomUUID(),
      name: name.trim(),
      type: "folder",
      children: [],
    };

    setTree((currentTree) => addNode(currentTree, folderId, node));
    return true;
  };

  const handleRenameNode = (nodeId: string) => {
    const name = window.prompt("New name?");
    if (!name?.trim()) {
      return;
    }
    setTree((currentTree) => renameNode(currentTree, nodeId, name.trim()));
  };

  const handleDeleteNode = (nodeId: string) => {
    if (selectedFileId) {
      const targetNode = findNodeById(tree, nodeId);
      const selectedInsideTarget =
        targetNode?.id === selectedFileId ||
        (targetNode?.children
          ? findNodeById(targetNode.children, selectedFileId) !== null
          : false);

      if (selectedInsideTarget) {
        setSelectedFileId(null);
      }
    }

    setTree((currentTree) => deleteNode(currentTree, nodeId));
  };

  const handleEditorContentChange = (content: string) => {
    if (!selectedFileId) {
      return;
    }

    setTree((currentTree) => updateNodeContent(currentTree, selectedFileId, content));
  };

  return (
    <main className="flex h-screen bg-background text-foreground">
      <aside className="panel w-80 border-r panel-border">
        <Toolbar
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
        />
        <Explorer
          data={tree}
          selectedFileId={selectedFileId}
          onSelectFile={setSelectedFileId}
          onAddFile={handleAddFileToFolder}
          onAddFolder={handleAddFolderToFolder}
          onRename={handleRenameNode}
          onDelete={handleDeleteNode}
        />
      </aside>

      <section className="flex-1">
        <Editor file={selectedFile} onChangeContent={handleEditorContentChange} />
      </section>
    </main>
  );
}
