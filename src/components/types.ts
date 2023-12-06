import type { Opaque } from "type-fest";

export type NodeId = Opaque<number, "nodeId">;
export const toNodeId = (id: number) => {
  return id as NodeId;
};

export interface Coords {
  x: number;
  y: number;
}

export interface MapNode {
  id: NodeId;
  coords: Coords;
  content: string;
  links: NodeId[];
}
