import { Node } from "./Node";
import { MapNode, NodeId, toNodeId } from "./types";
import "./Map.css";
import { NodeLink } from "./NodeLink";

const data: MapNode[] = [
  {
    id: toNodeId(1),
    content: "Foobarbaz",
    coords: { x: 10, y: 20 },
    links: [toNodeId(2)],
  },
  {
    id: toNodeId(2),
    content: "Alamakota",
    coords: { x: 80, y: 300 },
    links: [toNodeId(3)],
  },
  {
    id: toNodeId(3),
    content: "The square of something else",
    coords: { x: 500, y: 400 },
    links: [],
  },
];

const getLinks = (nodes: MapNode[]) => {
  const nodesMap = nodes.reduce<Record<NodeId, MapNode>>((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

  return nodes.flatMap(node => {
    if (node.links.length == 0) {
      return []
    }

    return node.links.map(linkToId => {
      const linkEndNode = nodesMap[linkToId];

      const linkCoords = {
        start: { x: node.coords.x, y: node.coords.y },
        end: { x: linkEndNode.coords.x, y: linkEndNode.coords.y }
      }

      return linkCoords;
    })
  })
};

export function Map() {
  const links = getLinks( data);
  console.log(links)

  return (
    <div className="map">
      {data.map((d) => (
        <Node key={d.id} {...d} />
      ))}
      {links.map(linkCoords => (
        <NodeLink {...linkCoords}  />
      ))}
    </div>
  );
}
