import { ExplorerNode } from "@/types/explorer";
import ExplorerItem from "./ExplorerItem";

interface ExplorerProps {
  data: ExplorerNode[];
  onAddFile: (folderId: string) => void;
  onAddFolder: (folderId: string) => void;
  onRename: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
}

export default function Explorer({
  data,
  onAddFile,
  onAddFolder,
  onRename,
  onDelete,
}: ExplorerProps) {
  return (
    <div className="py-2">
      {data.map((item) => (
        <ExplorerItem
          key={item.id}
          item={item}
          depth={0}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
