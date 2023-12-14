import { MapNode, toNodeId } from "./types";

export const testData: MapNode = {
  id: toNodeId(1),
  name: "TTRPG",
  content: "tabletop rpgs",
  children: [
    {
      id: toNodeId(2),
      name: "d20 based",
      children: [{ id: toNodeId(3), name: "D&D", content: "" }],
    },
    {
      id: toNodeId(4),
      name: "other",
      children: [
        {
          id: toNodeId(5),
          name: "PBTA",
          content: "Powered by the Apocalypse",
          children: [
            { id: toNodeId(501), name: "FiTD", content: "" },
            { id: toNodeId(501), name: "MoTW", content: "" },
          ],
        },
        { id: toNodeId(6), name: "CoC", content: "Call of Cthulhu" },
        { id: toNodeId(7), name: "Fate" },
        { id: toNodeId(7), name: "Delta Green" },
        { id: toNodeId(7), name: "Heart" },
      ],
    },
    {
      id: toNodeId(100),
      name: "OSR",
      children: [
        { id: toNodeId(101), name: "DCC", content: "" },
        {
          id: toNodeId(101),
          name: "NuOSR",
          content: "",
          children: [
            { id: toNodeId(201), name: "Into The Odd", content: "" },
            { id: toNodeId(202), name: "Mork Borg", content: "" },
            { id: toNodeId(202), name: " Longassssssss name", content: "" },
          ],
        },
      ],
    },
  ],
};
