import { useState } from "react";
import { testData } from "../features/mindmap/nodeData";
import { MindMapRadial } from "./MindMapRadial";
import { MapOptions } from "./types";
import { MindMapOptionsControls } from "./MindMapOptionsControls";

const baseWidth = 1000;
const baseHeight = 1200;

const baseNodeWidth = 150;
const baseNodeHeight = 150;

export function MindMapView() {
  const [width, setWidth] = useState(baseWidth);
  const [height, setHeight] = useState(baseHeight);
  const [nodeWidth, setNodeWidth] = useState(baseNodeWidth);
  const [nodeHeight, setNodeHeight] = useState(baseNodeHeight);

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
        setWidth={setWidth}
        setHeight={setHeight}
        setNodeWidth={setNodeWidth}
        setNodeHeight={setNodeHeight}
        onUpdateClick={forceFreshRender}
      />
      <MindMapRadial key={key} nodes={testData} mapOptions={mapOptions} />
      {/* <MindMapTree /> */}
    </div>
  );
}
