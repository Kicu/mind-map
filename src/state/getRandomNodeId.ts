import { toNodeId } from "../features/mindmap/types";

export function getRandomNodeId() {
  const id = crypto.randomUUID();

  return toNodeId(id);
}
