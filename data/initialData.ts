import { ExplorerNode } from "@/types/explorer";

export const initialData: ExplorerNode[] = [
  {
    id: crypto.randomUUID(),
    name: "src",
    type: "folder",
    children: [
      {
        id: crypto.randomUUID(),
        name: "components",
        type: "folder",
        children: [
          {
            id: crypto.randomUUID(),
            name: "Button.tsx",
            type: "file",
            content: "",
          },
        ],
      },
    ],
  },
];
