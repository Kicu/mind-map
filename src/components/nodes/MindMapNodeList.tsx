import { MapNode } from "../../features/mindmap/types";
import { MindMapNode } from "./MindMapNode";
import { createPortal } from "react-dom";

interface Props {
  mapNodes: MapNode[];
}

export function MindMapNodeList({ mapNodes }: Props) {
  return (
    <div className="">
      {mapNodes.map((node) => {
        const nodeContainer = document.getElementById(`node-${node.id}`);

        if (!nodeContainer) {
          console.warn(`found no element to render node with id: ${node.id}`);
          return null;
        }

        return createPortal(<MindMapNode nodeData={node} />, nodeContainer);
      })}
    </div>
  );
}
