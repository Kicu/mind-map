import clsx from "clsx";
import { useState } from "react";
import { MapNode } from "../../features/mindmap/types";
import "./MindMapNode.css";

interface Props {
  nodeData: MapNode;
  nodeColor: string;
}

export function MindMapNode({ nodeData, nodeColor }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenState = () => {
    setIsOpen(!isOpen);
  };

  const { name, content } = nodeData;

  const wrapperClass = clsx("node__nodeWrapper", {
    "node__nodeWrapper--isOpen": isOpen,
  });

  return (
    <div
      className={wrapperClass}
      style={{ backgroundColor: nodeColor }}
      onClick={toggleOpenState}
    >
      <div className="node__nodeName">
        <p>{name}</p>
      </div>
      {isOpen && content && (
        <div className="node__nodeContent">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
