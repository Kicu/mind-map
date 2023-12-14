import { Node } from "./Node";
import { MapNode } from "./types";
import "./Map.css";

const data: MapNode[] = [
  {
    id: 1,
    content: "Foobarbaz",
    coords: { x: 10, y: 20 },
    links: [2],
  },
  {
    id: 2,
    content: "Alamakota",
    coords: { x: 80, y: 300 },
    links: [3],
  },
  {
    id: 3,
    content: "The square of something else",
    coords: { x: 500, y: 400 },
    links: [],
  },
];

export function Map() {
  return (
    <div className="map">
      {data.map((d) => (
        <Node key={d.id} {...d} />
      ))}
    </div>
  );
}
