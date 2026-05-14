import { ExplorerNode } from "@/types/explorer";

interface EditorProps {
  file: ExplorerNode | null;
  onChangeContent: (content: string) => void;
}

const Editor = ({ file, onChangeContent }: EditorProps) => {
  if (!file) {
    return (
      <div className="muted flex h-full items-center justify-center text-sm">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <h2 className="mb-3 text-sm font-medium text-foreground">
        {file.name}
      </h2>
      <textarea
        value={file.content || ""}
        onChange={(event) => onChangeContent(event.target.value)}
        className="editor-input h-[calc(100%-2rem)] w-full resize-none rounded-md border p-3 font-mono text-sm outline-none"
      />
    </div>
  );
};

export default Editor;
