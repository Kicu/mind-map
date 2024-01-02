import { createPortal } from "react-dom";
import { MapNode } from "../../features/mindmap/types";
import { MindMapNode } from "./MindMapNode";

interface Props {
  mapNodes: MapNode[];
  nodeColor: string;
}

export function MindMapNodeList({ mapNodes, nodeColor }: Props) {
  return (
    <div className="">
      {mapNodes.map((node) => {
        const nodeContainer = document.getElementById(`node-${node.id}`);

        if (!nodeContainer) {
          console.warn(`no element found to render node with id: ${node.id}`);
          return null;
        }

        return createPortal(
          <MindMapNode nodeColor={nodeColor} nodeData={node} />,
          nodeContainer
        );
      })}
    </div>
  );
}
