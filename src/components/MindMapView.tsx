import { useCallback, useState } from "react";
// import data from "../state/static/data-ttrpgs";
import data from "../state/static/data-life";
import { MindMapRadial } from "./MindMapRadial";
import { MapOptions, MapType } from "./types";
import { MindMapOptionsControls } from "./controls/MindMapOptionsControls";
import { MindMapTree } from "./MindMapTree";

const baseWidth = 1000;
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
  // having a separate height doesn't currently improve the app - its easier to draw maps in a square container
  const [width, setWidth] = useState(baseWidth);
  const [nodeWidth, setNodeWidth] = useState(baseNodeWidth);
  const [nodeHeight, setNodeHeight] = useState(baseNodeHeight);
  const [mapColor, setMapColor] = useState<MapColor>("blue");
  const [mapType, setMapType] = useState<MapType>("RADIAL");

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
    height: width,
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
        setNodeWidth={setNodeWidth}
        setNodeHeight={setNodeHeight}
        setColor={setColor}
        onUpdateClick={forceFreshRender}
      />
      {mapType === "RADIAL" ? (
        <MindMapRadial key={key} nodes={data} mapOptions={mapOptions} />
      ) : (
        <MindMapTree key={key} nodes={data} mapOptions={mapOptions} />
      )}
    </div>
  );
}
