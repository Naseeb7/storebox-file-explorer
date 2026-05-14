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
  selectedFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onAddFile: (folderId: string) => boolean;
  onAddFolder: (folderId: string) => boolean;
  onRename: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
}

const DEPTH_INDENT_PX = 16;

const ExplorerItem = ({
  item,
  depth,
  selectedFileId,
  onSelectFile,
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

  const isSelectedFile = item.type === "file" && selectedFileId === item.id;

  const handleItemClick = () => {
    if (isFolder) {
      setIsExpanded((prev) => !prev);
      return;
    }
    onSelectFile(item.id);
  };

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    handleItemClick();
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={handleItemClick}
        onKeyDown={handleItemKeyDown}
        className={`tree-row group flex h-6 w-full cursor-pointer items-center gap-1 rounded-sm px-1.5 text-left text-[13px] transition-colors ${
          isSelectedFile ? "tree-row-selected" : ""
        }`}
      >
        <span className="muted flex h-4 w-4 shrink-0 items-center justify-center">
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            )
          )}
        </span>
        {isFolder ? (
          <Folder className="muted h-4 w-4 shrink-0" strokeWidth={1.8} />
        ) : (
          <File className="muted h-4 w-4 shrink-0" strokeWidth={1.8} />
        )}
        <span className="truncate leading-none">{item.name}</span>

        <span className="ml-auto hidden items-center gap-0.5 group-hover:flex">
          {isFolder ? (
            <>
              <button
                type="button"
                aria-label="Add file"
                className="icon-button rounded p-0.5"
                onClick={(event) => {
                  event.stopPropagation();
                  const created = onAddFile(item.id);
                  if (created) {
                    setIsExpanded(true);
                  }
                }}
              >
                <FilePlus2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Add folder"
                className="icon-button rounded p-0.5"
                onClick={(event) => {
                  event.stopPropagation();
                  const created = onAddFolder(item.id);
                  if (created) {
                    setIsExpanded(true);
                  }
                }}
              >
                <FolderPlus className="h-3.5 w-3.5" />
              </button>
            </>
          ) : null}
          <button
            type="button"
            aria-label="Rename"
            className="icon-button rounded p-0.5"
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
            className="icon-button rounded p-0.5"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>

      {hasChildren && isExpanded ? (
        <div style={{ paddingLeft: `${DEPTH_INDENT_PX}px` }}>
          {item.children!.map((child) => (
            <ExplorerItem
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedFileId={selectedFileId}
              onSelectFile={onSelectFile}
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
