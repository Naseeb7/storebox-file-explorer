interface ToolbarProps {
  onCreateFile: () => void;
  onCreateFolder: () => void;
}

const Toolbar = ({ onCreateFile, onCreateFolder }: ToolbarProps) => {
  return (
    <div className="flex items-center gap-2 border-b panel-border px-2 py-2">
      <button
        type="button"
        onClick={onCreateFile}
        className="rounded-md border panel-border px-2 py-1 text-xs tree-row hover:bg-hover"
      >
        New File
      </button>
      <button
        type="button"
        onClick={onCreateFolder}
        className="rounded-md border panel-border px-2 py-1 text-xs tree-row hover:bg-hover"
      >
        New Folder
      </button>
    </div>
  );
};

export default Toolbar;
