export interface Coords {
  x: number;
  y: number;
}

// Todo probably remove this later
export interface MapNode {
  id: number;
  coords: Coords;
  content: string;
  links: number[];
}
