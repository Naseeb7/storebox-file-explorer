"use client";

import { useMemo, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  FilePlus2,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import { ExplorerNode } from "@/types/explorer";

interface ExplorerItemProps {
  item: ExplorerNode;
  depth: number;
  onAddFile: (folderId: string) => void;
  onAddFolder: (folderId: string) => void;
  onRename: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
}

const ExplorerItem = ({
  item,
  depth,
  onAddFile,
  onAddFolder,
  onRename,
  onDelete,
}: ExplorerItemProps) => {
  const [isFolder, hasChildren] = useMemo<[boolean, boolean]>(() => {
    const folder = item.type === "folder";
    return [folder, folder && (item.children?.length ?? 0) > 0];
  }, [item.type, item.children]);
  const [isExpanded, setIsExpanded] = useState(depth === 0);

  const handleToggle = () => {
    if (!isFolder) {
      return;
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className="group flex h-6 w-full items-center gap-1 rounded-sm px-1.5 text-left text-[13px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-slate-400 dark:text-slate-500">
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            )
          )}
        </span>
        {isFolder ? (
          <Folder className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" strokeWidth={1.8} />
        ) : (
          <File className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={1.8} />
        )}
        <span className="truncate leading-none">{item.name}</span>

        <span className="ml-auto hidden items-center gap-0.5 group-hover:flex">
          {isFolder ? (
            <>
              <button
                type="button"
                aria-label="Add file"
                className="rounded p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddFile(item.id);
                }}
              >
                <FilePlus2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Add folder"
                className="rounded p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddFolder(item.id);
                }}
              >
                <FolderPlus className="h-3.5 w-3.5" />
              </button>
            </>
          ) : null}
          <button
            type="button"
            aria-label="Rename"
            className="rounded p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            onClick={(event) => {
              event.stopPropagation();
              onRename(item.id);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Delete"
            className="rounded p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </span>
      </button>

      {hasChildren && isExpanded ? (
        <div>
          {item.children!.map((child) => (
            <ExplorerItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ExplorerItem;
