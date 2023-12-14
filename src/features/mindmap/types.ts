import type { Opaque } from "type-fest";

export type NodeId = Opaque<number, "nodeId">;
export const toNodeId = (id: number) => {
  return id as NodeId;
};

export interface MapNode {
  id: NodeId;
  name: string;
  content?: string;
  children?: MapNode[];
}

export interface MapMeta {
    treeHeight: number;
    treeWidth: number;
    depth: number;
}

export type D3MapNode = d3.HierarchyPointNode<MapNode>;

export type D3MapLink = d3.HierarchyPointLink<MapNode>;

export interface MindMap {
    mapSVG: SVGSVGElement;
    meta: MapMeta;
}