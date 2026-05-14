import { ExplorerNode } from "@/types/explorer";
import ExplorerItem from "./ExplorerItem";

interface ExplorerProps {
  data: ExplorerNode[];
  selectedFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onAddFile: (folderId: string) => boolean;
  onAddFolder: (folderId: string) => boolean;
  onRename: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
}

export default function Explorer({
  data,
  selectedFileId,
  onSelectFile,
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
          selectedFileId={selectedFileId}
          onSelectFile={onSelectFile}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
