"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { ExplorerNode } from "@/types/explorer";

interface ExplorerItemProps {
  item: ExplorerNode;
  depth: number;
}

const ExplorerItem = ({ item, depth }: ExplorerItemProps) => {
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
        className="flex h-6 w-full items-center gap-1 rounded-sm px-1.5 text-left text-[13px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
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
      </button>

      {hasChildren && isExpanded ? (
        <div>
          {item.children!.map((child) => (
            <ExplorerItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ExplorerItem;
