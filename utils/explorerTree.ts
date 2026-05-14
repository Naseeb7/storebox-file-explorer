import { ExplorerNode } from "@/types/explorer";

function mapTree(
  nodes: ExplorerNode[],
  updater: (node: ExplorerNode) => ExplorerNode | null
): ExplorerNode[] {
  let changed = false;
  const nextNodes: ExplorerNode[] = [];

  for (const node of nodes) {
    const updated = updater(node);

    if (updated === null) {
      changed = true;
      continue;
    }

    if (updated !== node) {
      changed = true;
    }

    nextNodes.push(updated);
  }

  return changed ? nextNodes : nodes;
}

export function addNode(
  tree: ExplorerNode[],
  parentId: string,
  newNode: ExplorerNode
): ExplorerNode[] {
  return mapTree(tree, (node) => {
    if (node.id === parentId) {
      if (node.type !== "folder") {
        return node;
      }

      const children = node.children ?? [];
      return {
        ...node,
        children: [...children, newNode],
      };
    }

    if (!node.children?.length) {
      return node;
    }

    const updatedChildren = addNode(node.children, parentId, newNode);
    if (updatedChildren === node.children) {
      return node;
    }

    return {
      ...node,
      children: updatedChildren,
    };
  });
}

export function renameNode(
  tree: ExplorerNode[],
  nodeId: string,
  newName: string
): ExplorerNode[] {
  return mapTree(tree, (node) => {
    if (node.id === nodeId) {
      if (node.name === newName) {
        return node;
      }

      return {
        ...node,
        name: newName,
      };
    }

    if (!node.children?.length) {
      return node;
    }

    const updatedChildren = renameNode(node.children, nodeId, newName);
    if (updatedChildren === node.children) {
      return node;
    }

    return {
      ...node,
      children: updatedChildren,
    };
  });
}

export function deleteNode(tree: ExplorerNode[], nodeId: string): ExplorerNode[] {
  return mapTree(tree, (node) => {
    if (node.id === nodeId) {
      return null;
    }

    if (!node.children?.length) {
      return node;
    }

    const updatedChildren = deleteNode(node.children, nodeId);
    if (updatedChildren === node.children) {
      return node;
    }

    return {
      ...node,
      children: updatedChildren,
    };
  });
}
