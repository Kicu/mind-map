import { Coords } from "./types";
import "./NodeLink.css";

interface Props {
  start: Coords;
  end: Coords;
}

export function NodeLink({ start, end }: Props) {
  const { x: left, y: top } = start;
  const { x: right, y: bottom } = end;

  const rectWidth = right - left;
  const rectHeight = bottom - top;

  const diagonalLength = Math.sqrt(rectWidth ** 2 + rectHeight ** 2);
  const angle = Math.asin(rectHeight / diagonalLength);

  return (
    <div
      className="nodeLink"
      style={{
        left,
        top,
        width: diagonalLength,
        transform: `rotate(${angle}rad)`,
      }}
    ></div>
  );
}
