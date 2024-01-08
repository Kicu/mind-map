import { useEffect, useReducer, useState } from "react";
import { generateTreeMap } from "../features/mindmap/tree/generateTreeMap";
import { MapMeta, MapNode } from "../features/mindmap/types";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";
import { AttachForeignSVG } from "./AttachForeignSVG";
import { renderNode as renderNodeElement } from "./nodes/renderNode";
import { nodesReducer, registerNode } from "../state/mapNodesState";
import { MindMapNodeList } from "./nodes/MindMapNodeList";
import { MapOptions } from "./types";
import "./Map.css";

interface Props {
  nodes: MapNode;
  mapOptions: MapOptions;
}

export function MindMapTree({ nodes, mapOptions }: Props) {
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
    const { mapSVG, meta } = generateTreeMap(nodes, mapOptions, renderNode);

    setMapMeta(meta);
    setMapElement(mapSVG);
  }, [nodes, mapOptions]);

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
      {isMapSVGAttached && <MindMapNodeList mapNodes={Object.values(state)} nodeColor={nodeColor} />}
    </div>
  );
}
