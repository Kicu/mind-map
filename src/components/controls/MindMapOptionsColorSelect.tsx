import { MapOptions } from "../types";
import "./MindMapOptionsControls.css";

interface Props {
  options: MapOptions;
  availableColors: Record<string, string>;
  setColor: (value: string) => void;
}

export function MindMapOptionsColorSelect({
  options,
  availableColors,
  setColor,
}: Props) {
  const { nodeColor } = options;

  return (
    <div className="field">
      <label className="label is-small">Color</label>
      <div className="control">
        <div className="select is-small">
          <select
            defaultValue={nodeColor}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          >
            {Object.keys(availableColors).map((color) => {
              return (
                <option key={color} value={color}>
                  {color}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
