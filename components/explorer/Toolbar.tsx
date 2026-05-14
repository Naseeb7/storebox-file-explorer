interface ToolbarProps {
  onCreateFile: () => void;
  onCreateFolder: () => void;
}

const Toolbar = ({ onCreateFile, onCreateFolder }: ToolbarProps) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 px-2 py-2 dark:border-slate-800">
      <button
        type="button"
        onClick={onCreateFile}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        New File
      </button>
      <button
        type="button"
        onClick={onCreateFolder}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        New Folder
      </button>
    </div>
  );
};

export default Toolbar;
