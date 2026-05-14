import { ExplorerNode } from "@/types/explorer";
import ExplorerItem from "./ExplorerItem";

interface ExplorerProps {
  data: ExplorerNode[];
}

export default function Explorer({ data }: ExplorerProps) {
  return (
    <div className="py-2">
      {data.map((item) => (
        <ExplorerItem key={item.id} item={item} depth={0} />
      ))}
    </div>
  );
}
