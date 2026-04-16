export type TagColor =
  | "amber"
  | "teal"
  | "blue"
  | "coral"
  | "purple"
  | "pink"
  | "green"
  | "gray";

export const labelColors: Record<string, TagColor> = {
  "Anthropic API": "teal",
  "D3.js": "pink",
  Flask: "blue",
  GraphQL: "purple",
  IoT: "gray",
  Leaflet: "green",
  LoRa: "purple",
  Meshtastic: "blue",
  "Next.js": "coral",
  PostgreSQL: "gray",
  pgvector: "green",
  Python: "green",
  React: "blue",
  Tailwind: "amber",
};

export const DEFAULT_TAG_COLOR: TagColor = "gray";

export const tagStyles: Record<TagColor, string> = {
  amber: "bg-[#291800] text-[#FAC775]",
  teal: "bg-[#041a11] text-[#5DCAA5]",
  blue: "bg-[#040f1f] text-[#85B7EB]",
  coral: "bg-[#200e07] text-[#F0997B]",
  purple: "bg-[#100f24] text-[#AFA9EC]",
  pink: "bg-[#1a0811] text-[#ED93B1]",
  green: "bg-[#0d1a06] text-[#97C459]",
  gray: "bg-[#181818] text-[#B4B2A9]",
};
