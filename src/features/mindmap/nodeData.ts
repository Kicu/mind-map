import { MapNode, toNodeId } from "./types";

export const testData: MapNode = {
  id: toNodeId(1),
  name: "TTRPG",
  content: "tabletop rpgs",
  children: [
    {
      id: toNodeId(10),
      name: "d20 based",
      children: [
        { id: toNodeId(20), name: "D&D 5E", content: "" },
        { id: toNodeId(21), name: "D&D 3.5E" },
      ],
    },
    {
      id: toNodeId(100),
      name: "OSR",
      children: [
        { id: toNodeId(101), name: "DCC", content: "" },
        {
          id: toNodeId(102),
          name: "NuOSR",
          content: "",
          children: [
            { id: toNodeId(103), name: "Into The Odd", content: "" },
            { id: toNodeId(104), name: "Mork Borg", content: "" },
            { id: toNodeId(105), name: " Longassssssss name", content: "" },
          ],
        },
      ],
    },
    {
      id: toNodeId(3),
      name: "other",
      children: [
        {
          id: toNodeId(301),
          name: "PBTA",
          content: "Powered by the Apocalypse",
          children: [
            { id: toNodeId(302), name: "FiTD", content: "" },
            { id: toNodeId(303), name: "MoTW", content: "" },
          ],
        },
        { id: toNodeId(5), name: "CoC", content: "Call of Cthulhu" },
        { id: toNodeId(6), name: "Fate" },
        { id: toNodeId(7), name: "Delta Green" },
        { id: toNodeId(8), name: "Heart" },
      ],
    },
  ],
};
