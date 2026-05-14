import { ExplorerNode } from "@/types/explorer";

interface EditorProps {
  file: ExplorerNode | null;
}

const Editor = ({ file }: EditorProps) => {
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
      <pre className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200">
        {file.content || ""}
      </pre>
    </div>
  );
};

export default Editor;
