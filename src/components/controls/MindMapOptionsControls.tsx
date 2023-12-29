import { MapOptions, MapType } from "../types";
import { useState } from "react";
import "./MindMapOptionsControls.css";
import { MindMapOptionsColorSelect } from "./MindMapOptionsColorSelect";

function getCleanVal(val: string) {
  const value = parseInt(val, 10);

  if (isNaN(value)) {
    return 0;
  }

  return value;
}

interface Props {
  options: MapOptions;
  mapType: MapType;
  availableColors: Record<string, string>;
  setMapType: (type: MapType) => void;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  setNodeWidth: (value: number) => void;
  setNodeHeight: (value: number) => void;
  setColor: (value: string) => void;
  onUpdateClick: () => void;
}

export function MindMapOptionsControls({
  options,
  mapType,
  availableColors,
  setWidth,
  setHeight,
  setNodeWidth,
  setMapType,
  setColor,
  onUpdateClick,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const expandLabel = isExpanded ? "options ⬆️" : "options ⬇️";
  const wrapperClass =
    "mindMapOptions__formWrapper" + (isExpanded ? "--isExpanded" : "");

  return (
    <div className="mindMapOptions">
      <div className={wrapperClass}>
        <div className="field">
          <label className="label is-small">Width</label>
          <div className="control">
            <input
              className="input is-small"
              type="number"
              step="10"
              value={options.width || ""}
              onChange={(e) => {
                const value = getCleanVal(e.target.value);
                setWidth(value);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Height</label>
          <div className="control">
            <input
              className="input is-small"
              type="number"
              step="10"
              value={options.height || ""}
              onChange={(e) => {
                const value = getCleanVal(e.target.value);
                setHeight(value);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Node width</label>
          <div className="control">
            <input
              className="input is-small"
              type="number"
              value={options.nodeWidth || ""}
              onChange={(e) => {
                const value = getCleanVal(e.target.value);
                setNodeWidth(value);
              }}
            />
          </div>
        </div>
        {/* <div className="field">
          <label className="label is-small">Node height</label>
          <div className="control">
            <input
              className="input is-small"
              type="number"
              value={options.nodeHeight || ""}
              onChange={(e) => {
                const value = getCleanVal(e.target.value);
                setNodeHeight(value);
              }}
            />
          </div>
        </div> */}
        <MindMapOptionsColorSelect
          availableColors={availableColors}
          options={options}
          setColor={setColor}
        />
        <div className="field">
          <label className="label is-small">Map Type</label>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="treeType"
                checked={mapType === "TREE"}
                onChange={() => {
                  setMapType("TREE");
                }}
              />
              Tree
            </label>
            <label className="radio">
              <input
                type="radio"
                name="treeType"
                checked={mapType === "RADIAL"}
                onChange={() => {
                  setMapType("RADIAL");
                }}
              />
              Radial
            </label>
          </div>
        </div>
        <div className="control">
          <button
            onClick={onUpdateClick}
            className="button is-primary is-small"
          >
            Redraw Tree
          </button>
        </div>
      </div>
      <button
        className="button is-light is-small is-fullwidth"
        onClick={toggleExpanded}
      >
        {expandLabel}
      </button>
    </div>
  );
}
