import * as d3 from "d3";
import { D3MapLink } from "./types";

interface Options {
  color: string;
}

/**
 * Alternative approach.
 * Draw the links as curves using linkHorizontal() generator.
 * link.attr(
 *   "d",
 *   d3
 *     .linkVertical<d3.HierarchyPointLink<MNode>, [number, number]>()
 *     .source((link) => [link.source.x, link.source.y])
 *     .target((link) => [link.target.x, link.target.y])
 *   );
 */

/**
 * Generating svg elements for links between the nodes
 */
export function generateTreeMapLinks(
  linksData: D3MapLink[],
  { color }: Options
) {
  const linksGrouping = d3
    .create("svg")
    .append("g")
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 5);

  // Draw the links as svg <line>
  const link = linksGrouping.selectAll().data(linksData).join("line");

  link
    .attr("x1", (l) => l.source.x)
    .attr("y1", (l) => l.source.y)
    .attr("x2", (l) => l.target.x)
    .attr("y2", (l) => l.target.y);

  return linksGrouping.node();
}
