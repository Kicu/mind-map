import * as d3 from "d3";
import { MapNode, D3MapNode, MindMap } from "../types";
import { generateRadialMapLinks } from "./generateRadialMapLinks";
import { isRootNode } from "../mapUtils";
import { MapOptions } from "../../../components/types";

/**
 * because of the radial nature of this tree, the separation needs to be a function that reduces the gap based on radius
 * taken from docs: https://d3js.org/d3-hierarchy/tree#tree_separation
 */
function getNodeSeparation(a: D3MapNode, b: D3MapNode) {
  return (a.parent == b.parent ? 1 : 2) / a.depth;
}

export function generateRadialMap(
  data: MapNode,
  options: MapOptions,
  renderNode: (node: MapNode) => string
): MindMap {
  const { width, height, nodeWidth, nodeColor } = options;

  const root = d3.hierarchy(data);
  // TODO think about sorting nodes: root.sort(...);

  /*** Compute the layout ***/

  const radius = width / 2;

  const tree = d3
    .tree<MapNode>()
    .size([2 * Math.PI, radius])
    .separation(getNodeSeparation);

  // This line unfortunately mutates root, which means "root" now is also an `HierarchyPointNode<>` type, but TS does not know that
  const treeRoot = tree(root);

  // Count dimensions and center the graph

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

  // Draw the Tree/graph

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [
      -radius,
      -radius,
      2 * treeHeight + nodeWidth,
      2 * treeHeight + nodeWidth,
    ])
    .attr("style", "max-width: 100%; height: auto;");

  // Generate links
  const links = generateRadialMapLinks(treeRoot.links(), { color: nodeColor });
  svg.append(() => links);

  // Generate nodes
  function getNodeSize(node: D3MapNode) {
    if (isRootNode(node)) {
      return nodeWidth * 1.1;
    }

    const sizeCoefficient = node.depth * 0.1;

    return nodeWidth - sizeCoefficient * nodeWidth;
  }

  /**
   * This tree uses radial coordinates of style [angle, radius]
   * node.x - the angle (in radians)
   * node.y - how far from the center of circle node lies
   * To actually draw nodes we need to translate them by "y" coord and also rotate them using the angle
   * this will however also rotate all the content/text inside the node
   * because of that we combine the rotation + reverse rotation with translating in proper order
   * (Big thanks to Łukasz B. for showing me how combining rotations can work)
   */
  const node = svg
    .append("g")
    .attr("stroke-linejoin", "round")
    .selectAll()
    .data(treeRoot.descendants())
    .join("g")
    .attr("transform", (node) => {
      const nodeSize = getNodeSize(node);
      const rotationAngle = (node.x * 180) / Math.PI - 90; // rad to deg

      return (
        `rotate(${rotationAngle})` +
        `translate(${node.y},0)` +
        `rotate(${-rotationAngle})` +
        `translate(${-nodeSize / 2},${-nodeSize / 2})` // center the node
      );
    });

  node
    .append("foreignObject")
    .attr("width", getNodeSize)
    .attr("height", getNodeSize)
    .style("overflow", "visible")
    .html((node) => renderNode(node.data));

  // top level svg node is guaranteed b/c we actually create it
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mapNode = svg.node()!;

  return {
    mapSVG: mapNode,
    meta: treeMeta,
  };
}
