export interface MapOptions {
  width: number;
  height: number;
  nodeWidth: number;
  /**
   * currently nodeHeight = nodeWidth in the app and this field is unused
   */
  nodeHeight: number;
  nodeColor: string;
  lineColor?: string;
}

export type MapType = "TREE" | "RADIAL";
