import { useEffect, useReducer, useState } from "react";
import { MapGenerator, MapMeta, MapNode } from "../features/mindmap/types";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";
import { AttachForeignSVG } from "./AttachForeignSVG";
import { renderNode as renderNodeElement } from "./nodes/renderNode";
import { MindMapNodeList } from "./nodes/MindMapNodeList";
import { nodesReducer, registerNode } from "../state/mapNodesState";
import { MapOptions } from "./types";
import "./Map.css";

interface Props {
  nodes: MapNode;
  mapOptions: MapOptions;
  generateMindMap: MapGenerator;
}

export function MindMap({ nodes, mapOptions, generateMindMap }: Props) {
  const { width, height, nodeColor } = mapOptions;

  const [mapSVGElement, setMapElement] = useState<SVGSVGElement>();
  const [mapMeta, setMapMeta] = useState<MapMeta>();
  const [isMapSVGAttached, setIsMapSVGAttached] = useState(false);

  const [state, dispatch] = useReducer(nodesReducer, {});

  const renderNode = (node: MapNode) => {
    dispatch(registerNode(node));

    return renderNodeElement(node);
  };

  useEffect(() => {
    const { mapSVG, meta } = generateMindMap(nodes, mapOptions, renderNode);

    setMapElement(mapSVG);
    setMapMeta(meta);
  }, [nodes, mapOptions, generateMindMap]);

  return (
    <div className="map" style={{ width, height }}>
      {mapMeta && <MindMapInfo meta={mapMeta} />}
      {mapSVGElement && (
        <AttachForeignSVG
          element={mapSVGElement}
          onElementAttached={() => {
            setIsMapSVGAttached(true);
          }}
        />
      )}
      {isMapSVGAttached && (
        <MindMapNodeList
          mapNodes={Object.values(state)}
          nodeColor={nodeColor}
        />
      )}
    </div>
  );
}
