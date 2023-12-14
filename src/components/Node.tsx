import { useState } from "react";
import { MapNode } from "./types";
import "./Node.css";

export function Node({ content, coords }: MapNode) {
  const [currentContent, setContent] = useState(content);
  const [currentCoords, setCoords] = useState(coords);
  const [isDragged, setIsDragged] = useState(false);

  const { x, y } = currentCoords;

  const startDragging = () => {
    setIsDragged(true);
  };
  const stopDragging = () => {
    setIsDragged(false);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragged) {
      return;
    }

    const x = e.clientX - 15;
    const y = e.clientY - 15;
    setCoords({ x, y });
  };

  return (
    <div
      className="nodeWrapper"
      style={{ left: x, top: y }}
      onMouseUp={stopDragging}
      onMouseMove={onDrag}
    >
      <div className="box">
        <div className="nodeWrapper__dragToggle" onMouseDown={startDragging}>
          🤝
        </div>
        <input
          type="text"
          value={currentContent}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
