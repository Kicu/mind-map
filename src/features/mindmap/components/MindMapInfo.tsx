import { MapMeta } from "../types";

interface Props {
  meta: MapMeta;
}

export function MindMapInfo({ meta }: Props) {
  const treeSize = `Tree: ${meta.treeWidth} x ${meta.treeHeight}`;

  return <div>{`${treeSize} (${meta.depth} levels)`}</div>;
}
