import { useCallback, useState } from "react";
import { testData } from "../features/mindmap/nodeData";
import { MindMapRadial } from "./MindMapRadial";
import { MapOptions, MapType } from "./types";
import { MindMapOptionsControls } from "./controls/MindMapOptionsControls";
import { MindMapTree } from "./MindMapTree";

const baseWidth = 1100;
const baseHeight = 900;
const baseNodeWidth = 150;
const baseNodeHeight = 150;

const availableColors = {
  blue: "cornflowerblue",
  green: "#a8d1d1",
  lilac: "#9ea1d4",
  reddish: "#fd8a8a",
};

type MapColor = keyof typeof availableColors;

export function MindMapView() {
  const [width, setWidth] = useState(baseWidth);
  const [height, setHeight] = useState(baseHeight);
  const [nodeWidth, setNodeWidth] = useState(baseNodeWidth);
  const [nodeHeight, setNodeHeight] = useState(baseNodeHeight);
  const [mapColor, setMapColor] = useState<MapColor>("blue");
  const [mapType, setMapType] = useState<MapType>("TREE");

  // sneaky hacky way to just drop the whole react-tree with <Map> and render a fresh one
  const [key, setKey] = useState(1);
  const forceFreshRender = () => {
    setKey(key + 1);
  };

  const setColor = useCallback((color: string) => {
    setMapColor(color as MapColor);
  }, []);

  const mapOptions: MapOptions = {
    width,
    height,
    nodeWidth,
    nodeHeight,
    nodeColor: availableColors[mapColor],
  };

  return (
    <div className="map-container">
      <MindMapOptionsControls
        options={mapOptions}
        mapType={mapType}
        availableColors={availableColors}
        setMapType={setMapType}
        setWidth={setWidth}
        setHeight={setHeight}
        setNodeWidth={setNodeWidth}
        setNodeHeight={setNodeHeight}
        setColor={setColor}
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
