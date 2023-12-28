import { useEffect, useReducer, useState } from "react";
import { generateRadialMap } from "../features/mindmap/radial/generateRadialMap";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";
import { renderNode as renderNodeElement } from "./nodes/renderNode";
import { MapMeta, MapNode } from "../features/mindmap/types";
import { MindMapNodeList } from "./nodes/MindMapNodeList";
import { AttachForeignSVG } from "./AttachForeignSVG";
import { nodesReducer, registerNode } from "../state/mapNodesState";
import { MapOptions } from "./types";
import "./Map.css";

interface Props {
  nodes: MapNode;
  mapOptions: MapOptions;
}

export function MindMapRadial({ nodes, mapOptions }: Props) {
  const { width, height } = mapOptions;

  const [mapSVGElement, setMapElement] = useState<SVGSVGElement>();
  const [mapMeta, setMapMeta] = useState<MapMeta>();
  const [isMapSVGAttached, setIsMapSVGAttached] = useState(false);

  const [state, dispatch] = useReducer(nodesReducer, {});

  const renderNode = (node: MapNode) => {
    dispatch(registerNode(node));

    return renderNodeElement(node);
  };

  useEffect(() => {
    const { mapSVG, meta } = generateRadialMap(nodes, mapOptions, renderNode);

    setMapElement(mapSVG);
    setMapMeta(meta);
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
      {isMapSVGAttached && <MindMapNodeList mapNodes={Object.values(state)} />}
    </div>
  );
}
