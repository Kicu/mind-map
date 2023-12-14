import { useEffect, useRef } from "react";
import { generateTreeMap } from "../features/mindmap/generateTreeMap";
import { D3MapNode } from "../features/mindmap/types";
import { testData } from "../features/mindmap/nodeData";
import "./Map.css";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";

const renderNode = (node: D3MapNode) => {
  const text = node.data.name;
  const aside = `[${Math.trunc(node.x)},${Math.trunc(node.y)}]`;

  return `<div class="node"><p>${text}</p><div class="is-size-7">${aside}</div></div>`;
};

const width = 1000;
const height = 600;

export function D3TestMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { mapSVG, meta } = generateTreeMap(testData, width, height, renderNode);

  useEffect(() => {
    if (mapSVG && containerRef.current?.children.length === 0) {
      containerRef.current?.appendChild(mapSVG);
    }
  }, []);

  return (
    <div className="map" style={{ width, height }}>
      <MindMapInfo meta={meta} />
      <div ref={containerRef}></div>
    </div>
  );
}
