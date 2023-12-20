import { MapNode } from "../../features/mindmap/types";

interface Props {
  nodeData: MapNode;
}

export function MindMapNode({ nodeData }: Props) {
  return (
    <div className="node__nodeWrapper">
      <div className="node__content">
        <p>{nodeData.name}</p>
      </div>
    </div>
  );
}
