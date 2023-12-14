import { useEffect, useRef } from "react";
import { D3MapNode } from "../features/mindmap/types";
import { generateMap } from "../features/mindmap/generateRadialMap";
import { testData } from "../features/mindmap/nodeData";
import "./Map.css";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";

const renderNode = (node: D3MapNode) => {
  const text = node.data.name;
  const aside = `[${Math.trunc(node.x)},${Math.trunc(node.y)}]`;

  return `<div class="node"><p>${text}</p><div class="is-size-7">${aside}</div></div>`;
};

const width = 1000;
const height = 1000;

export function D3RadialMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { mapSVG, meta } = generateMap(testData, width, height, renderNode);

  useEffect(() => {
    if (containerRef.current?.children.length === 0) {
      containerRef.current.appendChild(mapSVG);
    }
  }, [mapSVG]);

  return (
    <div className="map" style={{ width, height }}>
      <MindMapInfo meta={meta} />
      <div ref={containerRef}></div>
    </div>
  );
}
