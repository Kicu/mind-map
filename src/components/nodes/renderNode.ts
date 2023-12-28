import { MapNode } from "../../features/mindmap/types";

export const renderNode = (node: MapNode) => {
  const { id } = node;

  return `<div style="width:100%; height:100%" id="node-${id}"></div>`;
};
