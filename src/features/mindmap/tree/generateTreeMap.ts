import * as d3 from "d3";
import { MapNode, D3MapNode, MindMap } from "../types";
import { generateTreeMapLinks } from "./generateTreeMapLinks";
import { MapOptions } from "../../../components/types";

export const nodeColor = "cornflowerblue";

export function generateTreeMap(
  data: MapNode,
  options: MapOptions,
  renderNode: (node: MapNode) => string
): MindMap {
  const { width, height, nodeWidth, nodeColor } = options;
  const nodeHeight = nodeWidth;

  const root = d3.hierarchy(data);
  // TODO think about sorting nodes: root.sort(...);

  /*** Compute the layout ***/

  const tree = d3
    .tree<MapNode>()
    .nodeSize([nodeWidth, nodeHeight])
    .separation(() => 1.5);

  // This line unfortunately mutates root, which means "root" now is also an `HierarchyPointNode<>` type, but TS does not know that
  const treeRoot = tree(root);

  // Calculate SVG dimensions and center the tree.
  let x0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;

  treeRoot.each((node: D3MapNode) => {
    if (node.x > x1) {
      x1 = node.x;
    }
    if (node.x < x0) {
      x0 = node.x;
    }
    if (node.y > y1) {
      y1 = node.y;
    }
  });

  const treeWidth = Math.abs(x0) + Math.abs(x1);
  const treeHeight = y1; // tree starts at 0 so y0 = 0

  // Add 1 to account for the root node
  const hierarchyHeight = root.height + 1;
  const treeMeta = { treeWidth, treeHeight, depth: hierarchyHeight };

  // Create the container
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [
      x0 - nodeWidth / 2 - 10,
      - nodeWidth / 2,
      treeWidth + nodeWidth + 20, // +20 accounts for nodes expanding on hover to avoid clipping
      treeHeight + nodeHeight,
    ])
    .attr("style", "max-width: 100%; height: auto;");

  // Add Links
  const links = generateTreeMapLinks(treeRoot.links(), { color: nodeColor });
  svg.append(() => links);

  // Add nodes
  const node = svg
    .append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 2)
    .selectAll()
    .data(treeRoot.descendants())
    .join("g")
    .attr("transform", (node) => {
      const x = node.x - nodeWidth / 2;
      const y = node.y - nodeWidth / 2; // assuming node-circle is always square
      return `translate(${x},${y})`;
    });

  node
    .append("foreignObject")
    .attr("width", () => {
      return nodeWidth;
    })
    .attr("height", () => {
      return nodeWidth;
    })
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
