export type NodeType = "file" | "folder";

export interface ExplorerNode {
  id: string;
  name: string;
  type: NodeType;
  children?: ExplorerNode[];
  content?: string;
}
