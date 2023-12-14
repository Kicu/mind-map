import * as d3 from "d3";
import { MapNode, D3MapNode, MindMap } from "./types";
import { generateTreeMapLinks } from "./generateTreeMapLinks";

export const nodeColor = "cornflowerblue";

export function generateTreeMap(
  data: MapNode,
  width: number,
  height: number,
  renderNode: (node: D3MapNode) => string
): MindMap {
  const root = d3.hierarchy(data);
  // TODO think about sorting nodes: root.sort(...);

  /*** Compute the layout ***/

  // Todo think about node sizes
  const nodeHeight = 200;
  const nodeWidth = 150;

  const tree = d3
    .tree<MapNode>()
    .nodeSize([nodeWidth, nodeHeight])
    .separation(() => 1.5);

  // This line unfortunately mutates root, which means "root" now is also an `HierarchyPointNode<>` type, but TS does not know that
  const treeRoot = tree(root);

  // Count dimensions and center the tree.
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
      x0 - nodeWidth / 2,
      -nodeHeight / 2,
      treeWidth + nodeWidth,
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
    .attr("stroke-width", 3)
    .selectAll()
    .data(treeRoot.descendants())
    .join("g")
    .attr("transform", (d) => {
      const x = d.x - nodeWidth / 2;
      const y = d.y - nodeWidth / 2; // assuming node-circle is always square
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
    .html((d) => renderNode(d));

  // top level svg node is guaranteed b/c we actually create it
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mapNode = svg.node()!;

  return {
    mapSVG: mapNode,
    meta: treeMeta,
  };
}
