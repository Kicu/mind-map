import { MapNode, toNodeId } from "../../features/mindmap/types";

const data: MapNode = {
  id: toNodeId("1"),
  name: "TTRPGs",
  content: "Simplified hierarchy of some types of tabletop rpg games",
  children: [
    {
      id: toNodeId("200"),
      name: "OSR",
      children: [
        { id: toNodeId("210"), name: "DCC", content: "" },
        {
          id: toNodeId("220"),
          name: "NuOSR",
          content: "",
          children: [
            { id: toNodeId("221"), name: "Into The Odd", content: "" },
            { id: toNodeId("222"), name: "Mork Borg", content: "" },
          ],
        },
        { id: toNodeId("230"), name: "Worlds Without Number", content: "" },
        { id: toNodeId("240"), name: "Stars Without Number", content: "" },
      ],
    },
    {
      id: toNodeId("100"),
      name: "d20 based",
      children: [
        {
          id: toNodeId("110"),
          name: "D&D 5E",
          content: "The most popular ttrpg currently on the market",
        },
        { id: toNodeId("120"), name: "D&D 3.5E" },
      ],
    },
    {
      id: toNodeId("300"),
      name: "other",
      children: [
        {
          id: toNodeId("301"),
          name: "PbtA",
          content: "Powered by the Apocalypse",
          children: [
            {
              id: toNodeId("302"),
              name: "FiTD",
              content: "",
              children: [
                {
                  id: toNodeId("303"),
                  name: "Blades in the Dark",
                  content: "",
                },
                { id: toNodeId("304"), name: "Scum & Villainy" },
              ],
            },
            { id: toNodeId("310"), name: "MoTW", content: "" },
          ],
        },
        {
          id: toNodeId("350"),
          name: "CoC",
          content: "Call of Cthulhu",
          children: [{ id: toNodeId("351"), name: "Pulp Cthulhu" }],
        },
        { id: toNodeId("360"), name: "Fate" },
        { id: toNodeId("370"), name: "Delta Green" },
        { id: toNodeId("380"), name: "Heart" },
      ],
    },
  ],
};

export default data;
