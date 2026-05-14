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
        className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <span className="flex h-4 w-4 items-center justify-center text-slate-500">
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          )}
        </span>
        {isFolder ? (
          <Folder className="h-4 w-4 text-amber-500" />
        ) : (
          <File className="h-4 w-4 text-slate-500" />
        )}
        <span className="truncate">{item.name}</span>
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
