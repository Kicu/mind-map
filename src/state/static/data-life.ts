import { MapNode, toNodeId } from "../../features/mindmap/types";

const data: MapNode = {
  id: toNodeId("6b005969-217a-4218-9e4c-f7b678773360"),
  name: "Life",
  content: "Heavily simplified and partial tree of life",
  children: [
    {
      id: toNodeId("2b7f312b-5143-41ba-8e9c-8629390d592a"),
      name: "Bacteria",
      children: [],
    },
    {
      id: toNodeId("f71e75b1-a447-4dd7-9049-59a739e73fca"),
      name: "Archaea",
      children: [],
    },
    {
      id: toNodeId("94881744-bcbc-4c19-9bd8-024ea775b7ec"),
      name: "Eukaryotes",
      children: [
        {
          id: toNodeId("4be43d09-bbb7-4666-b590-c4c651c81fd7"),
          name: "Fungi",
          content: "",
        },
        {
          id: toNodeId("9f3bc273-e093-438b-ab36-326319948c42"),
          name: "Plants",
        },
        {
          id: toNodeId("0ca2a75d-14d9-48f2-948a-50e6faa73059"),
          name: "Animals",
          children: [
            {
              id: toNodeId("27ffbcaa-7dc4-43b2-a369-c2494258c27e"),
              name: "Invertebrates",
            },
            {
              id: toNodeId("233eab04-b668-4f1f-90ed-f0d4bdd7357e"),
              name: "Vertebrates",
              children: [
                { id: toNodeId("1"), name: "Fish" },
                { id: toNodeId("2"), name: "Amphibians" },
                { id: toNodeId("3"), name: "Reptiles" },
                { id: toNodeId("4"), name: "Birds" },
                {
                  id: toNodeId("5"),
                  name: "Mammals",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default data;
