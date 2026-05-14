import { ExplorerNode } from "@/types/explorer";

interface EditorProps {
  file: ExplorerNode | null;
  onChangeContent: (content: string) => void;
}

const Editor = ({ file, onChangeContent }: EditorProps) => {
  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <h2 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-200">
        {file.name}
      </h2>
      <textarea
        value={file.content || ""}
        onChange={(event) => onChangeContent(event.target.value)}
        className="h-[calc(100%-2rem)] w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-700 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:focus:border-slate-500"
      />
    </div>
  );
};

export default Editor;
