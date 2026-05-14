import { ExplorerNode } from "@/types/explorer";

export const initialData: ExplorerNode[] = [
  {
    id: "root-src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "root-src-components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "root-src-components-button",
            name: "Button.tsx",
            type: "file",
            content: "",
          },
        ],
      },
    ],
  },
];
