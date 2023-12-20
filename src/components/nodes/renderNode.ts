import { D3MapNode } from "../../features/mindmap/types";

export const renderNode = (node: D3MapNode) => {
  const { id } = node.data;

  return `<div style="width:100%; height:100%" id="node-${id}"></div>`;
};
