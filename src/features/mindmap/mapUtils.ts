import { D3MapNode } from "./types";

export function isRootNode(node: D3MapNode) {
  return node.depth === 0;
}
