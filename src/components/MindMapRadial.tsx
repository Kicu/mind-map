import { useEffect, useReducer, useState } from "react";
import { generateRadialMap } from "../features/mindmap/generateRadialMap";
import { testData } from "../features/mindmap/nodeData";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";
import { renderNode as renderNodeElement } from "./nodes/renderNode";
import { D3MapNode, MapMeta } from "../features/mindmap/types";
import { MindMapNodeList } from "./nodes/MindMapNodeList";
import { AttachForeignSVG } from "./AttachForeignSVG";
import { nodesReducer, registerNode } from "../state/mapNodesState";
import "./Map.css";

const width = 1200;
const height = 1200;

export function MindMapRadial() {
  const [mapSVGElement, setMapElement] = useState<SVGSVGElement>();
  const [mapMeta, setMapMeta] = useState<MapMeta>();
  const [isMapSVGAttached, setIsMapSVGAttached] = useState(false);

  const [state, dispatch] = useReducer(nodesReducer, {});

  const renderNode = (node: D3MapNode) => {
    dispatch(registerNode(node.data));

    return renderNodeElement(node);
  };

  useEffect(() => {
    const { mapSVG, meta } = generateRadialMap(
      testData,
      width,
      height,
      renderNode
    );

    setMapElement(mapSVG);
    setMapMeta(meta);
  }, []);

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
