import { MapMeta } from "../types";

interface Props {
  meta: MapMeta;
}

export function MindMapInfo({ meta }: Props) {
  const mapSize = `Map dimensions: ${meta.treeWidth} x ${meta.treeHeight}`;

  return <div>{`${mapSize} (depth: ${meta.depth})`}</div>;
}
