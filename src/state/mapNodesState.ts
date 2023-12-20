import { MapNode } from "../features/mindmap/types";

interface Action {
  type: "REGISTER_NODE";
  data: MapNode;
}

type NodesState = Record<number, MapNode>;

export function nodesReducer(state: NodesState, action: Action) {
  return {
    ...state,
    [action.data.id]: action.data,
  };
}

export function registerNode(nodeData: MapNode): Action {
  return {
    type: "REGISTER_NODE",
    data: nodeData,
  };
}
