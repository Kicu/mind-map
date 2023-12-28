import { useState } from "react";
import { testData } from "../features/mindmap/nodeData";
import { MindMapRadial } from "./MindMapRadial";
import { MapOptions, MapType } from "./types";
import { MindMapOptionsControls } from "./MindMapOptionsControls";
import { MindMapTree } from "./MindMapTree";

const baseWidth = 1100;
const baseHeight = 1000;
const baseNodeWidth = 150;
const baseNodeHeight = 150;

export function MindMapView() {
  const [width, setWidth] = useState(baseWidth);
  const [height, setHeight] = useState(baseHeight);
  const [nodeWidth, setNodeWidth] = useState(baseNodeWidth);
  const [nodeHeight, setNodeHeight] = useState(baseNodeHeight);
  const [mapType, setMapType] = useState<MapType>("TREE");

  // sneaky hacky way to just drop the whole react-tree with <Map> and render a fresh one
  const [key, setKey] = useState(1);
  const forceFreshRender = () => {
    setKey(key + 1);
  };

  const mapOptions: MapOptions = {
    width,
    height,
    nodeWidth,
    nodeHeight,
    nodeColor: "cornflowerblue", // Todo this color is actually set in CSS - fix it
  };

  return (
    <div className="map-container">
      <MindMapOptionsControls
        options={mapOptions}
        mapType={mapType}
        setMapType={setMapType}
        setWidth={setWidth}
        setHeight={setHeight}
        setNodeWidth={setNodeWidth}
        setNodeHeight={setNodeHeight}
        onUpdateClick={forceFreshRender}
      />
      {mapType === "RADIAL" ? (
        <MindMapRadial key={key} nodes={testData} mapOptions={mapOptions} />
      ) : (
        <MindMapTree key={key} nodes={testData} mapOptions={mapOptions} />
      )}
    </div>
  );
}
