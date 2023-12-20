import { MapMeta } from "../types";

interface Props {
  meta: MapMeta;
}

export function MindMapInfo({ meta }: Props) {
  const treeSize = `Map dimensions: ${meta.treeWidth} x ${meta.treeHeight}`;

  return <div>{`${treeSize} (depth: ${meta.depth})`}</div>;
}
