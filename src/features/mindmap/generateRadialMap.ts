import * as d3 from "d3";
import { MapNode, D3MapNode, MindMap } from "./types";
import { generateRadialMapLinks } from "./generateRadialMapLinks";
import { isRootNode } from "./mapUtils";

export const nodeColor = "cornflowerblue";

export function generateMap(
  data: MapNode,
  width: number,
  height: number,
  renderNode: (node: D3MapNode) => string
): MindMap {
  const root = d3.hierarchy(data);
  // TODO think about sorting nodes: root.sort(...);

  /*** Compute the layout ***/

  // Add 1 to fit every layer of nodes
  const nodeWidth = 150;
  const radius = width / 2;

  const tree = d3
    .tree<MapNode>()
    .size([2 * Math.PI, radius])
    .separation(() => 2);

  // This line unfortunately mutates root, which means "root" now is also an `HierarchyPointNode<>` type, but TS does not know that
  const treeRoot = tree(root);

  // Count dimensions and center the tree.

  let yMax = -Infinity;

  treeRoot.each((node: D3MapNode) => {
    if (node.y > yMax) {
      yMax = node.y;
    }
  });

  const treeHeight = yMax; // y0 is always 0

  // Add 1 to account for the root node
  const hierarchyHeight = root.height + 1;
  // This tree is always drawn in a radial way, so the definition of "width/height" is different
  const treeMeta = {
    treeWidth: 2 * treeHeight,
    treeHeight: 2 * treeHeight,
    depth: hierarchyHeight,
  };

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [
      -radius - nodeWidth / 2,
      -radius - nodeWidth / 2,
      2 * treeHeight + nodeWidth,
      2 * treeHeight + nodeWidth,
    ])
    .attr("style", "max-width: 100%; height: auto;");

  function getNodeSize(node: D3MapNode) {
    if (isRootNode(node)) {
      return nodeWidth * 1.1;
    }

    const sizeCoefficient = node.depth * 0.1;

    return nodeWidth - sizeCoefficient * nodeWidth;
  }

  // Generate links
  const links = generateRadialMapLinks(treeRoot.links(), { color: nodeColor });
  svg.append(() => links);

  // Generate nodes
  const node = svg
    .append("g")
    .attr("stroke-linejoin", "round")
    .selectAll()
    .data(treeRoot.descendants())
    .join("g")
    .attr("transform", (node) => {
      const nodeSize = getNodeSize(node);
      return (
        `rotate(${(node.x * 180) / Math.PI - 90})` +
        `translate(${node.y - nodeSize / 2},${-nodeSize / 2})`
      );
    });

  node
    .append("foreignObject")
    .attr("width", getNodeSize)
    .attr("height", getNodeSize)
    .append("xhtml:div")
    .style("width", (node) => {
      return `${getNodeSize(node)}px`;
    })
    .style("height", (node) => {
      return `${getNodeSize(node)}px`;
    })
    .style("transform", (node) => {
      const rotation = (node.x * 180) / Math.PI - 90;
      return `rotate(${-rotation}deg)`;
    })
    .html((d) => renderNode(d));

  // top level svg node is guaranteed b/c we actually create it
  const mapNode = svg.node()!;

  return {
    mapSVG: mapNode,
    meta: treeMeta,
  };
}
