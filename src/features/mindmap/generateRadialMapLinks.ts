import * as d3 from "d3";
import { D3MapLink, D3MapNode } from "./types";

interface Options {
  color: string;
}

/**
 * Generating svg elements for links between the nodes
 */
export function generateRadialMapLinks(
  linksData: D3MapLink[],
  { color }: Options
) {
  const linksGrouping = d3
    .create("svg")
    .append("g")
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 5);

  // Draw the links as svg path using d3 line generator
  const link = linksGrouping.selectAll("path").data(linksData).join("path");

  link.attr("d", (link) => {
    const lineGenerator = d3
      .lineRadial<D3MapNode>()
      .angle((d) => d.x)
      .radius((d) => d.y);

    return lineGenerator([link.source, link.target]);
  });

  return linksGrouping.node();
}
