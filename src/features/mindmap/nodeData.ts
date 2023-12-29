import { MapNode, toNodeId } from "./types";

export const testData: MapNode = {
  id: toNodeId("1"),
  name: "TTRPG",
  content: "Tabletop rpgs",
  children: [
    {
      id: toNodeId("10"),
      name: "d20 based",
      children: [
        {
          id: toNodeId("20"),
          name: "D&D 5E",
          content: "The most popular ttrpg currently on the market",
        },
        { id: toNodeId("21"), name: "D&D 3.5E" },
      ],
    },
    {
      id: toNodeId("100"),
      name: "OSR",
      children: [
        { id: toNodeId("101"), name: "DCC", content: "" },
        {
          id: toNodeId("102"),
          name: "NuOSR",
          content: "",
          children: [
            { id: toNodeId("103"), name: "Into The Odd", content: "" },
            { id: toNodeId("104"), name: "Mork Borg", content: "" },
            {
              id: toNodeId("105"),
              name: " Longassssssss name",
              content: "Longassssssssssss text jumped over the red-ish Fox",
            },
          ],
        },
        { id: toNodeId("110"), name: "Worlds Without Number", content: "" },
        { id: toNodeId("111"), name: "Stars Without Number", content: "" },
      ],
    },
    {
      id: toNodeId("3"),
      name: "other",
      children: [
        {
          id: toNodeId("301"),
          name: "PBTA",
          content: "Powered by the Apocalypse",
          children: [
            { id: toNodeId("302"), name: "FiTD", content: "" },
            { id: toNodeId("303"), name: "MoTW", content: "" },
          ],
        },
        {
          id: toNodeId("5"),
          name: "CoC",
          content: "Call of Cthulhu",
          children: [{ id: toNodeId("55"), name: "Pulp Cthulhu" }],
        },
        { id: toNodeId("6"), name: "Fate" },
        { id: toNodeId("7"), name: "Delta Green" },
        { id: toNodeId("8"), name: "Heart" },
      ],
    },
  ],
};

// Todo verify why this draws ugly
// export const testData2: MapNode = {
//   id: toNodeId("1"),
//   name: "Życie",
//   content: "",
//   children: [
//     { id: toNodeId("101"), name: "bakterie", content: "" },
//     { id: toNodeId("102"), name: "jednokomorkowce", content: "" },
//     { id: toNodeId("103"), name: "grzyby", content: "" },
//     { id: toNodeId("104"), name: "rośliny", content: "" },
//     {
//       id: toNodeId("105"),
//       name: "zwierzęta",
//       children: [
//         { id: toNodeId("200"), name: "bezkręgowce", content: "" },
//         { id: toNodeId("201"), name: "ryby", content: "" },
//         { id: toNodeId("202"), name: "płazy", content: "" },
//         { id: toNodeId("203"), name: "gady", content: "" },
//         { id: toNodeId("204"), name: "ptaki", content: "" },
//         { id: toNodeId("205"), name: "ssaki", content: "" },
//       ],
//     },
//   ],
// };
