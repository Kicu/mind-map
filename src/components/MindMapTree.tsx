import { useEffect, useReducer, useState } from "react";
import { generateTreeMap } from "../features/mindmap/generateTreeMap";
import { D3MapNode, MapMeta } from "../features/mindmap/types";
import { testData } from "../features/mindmap/nodeData";
import { MindMapInfo } from "../features/mindmap/components/MindMapInfo";
import { AttachForeignSVG } from "./AttachForeignSVG";
import { renderNode as renderNodeElement } from "./nodes/renderNode";
import { nodesReducer, registerNode } from "../state/mapNodesState";
import "./Map.css";
import { MindMapNodeList } from "./nodes/MindMapNodeList";

const width = 1000;
const height = 600;

export function MindMapTree() {
  const [mapMeta, setMapMeta] = useState<MapMeta>();
  const [mapSVGElement, setMapElement] = useState<SVGSVGElement>();
  const [isMapSVGAttached, setIsMapSVGAttached] = useState(false);

  const [state, dispatch] = useReducer(nodesReducer, {});

  const renderNode = (node: D3MapNode) => {
    dispatch(registerNode(node.data));

    return renderNodeElement(node);
  };

  // for now since all the tree args are local we just run effect once
  useEffect(() => {
    const { mapSVG, meta } = generateTreeMap(
      testData,
      width,
      height,
      renderNode
    );

    setMapMeta(meta);
    setMapElement(mapSVG);
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
