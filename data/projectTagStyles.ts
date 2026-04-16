export type TagColor =
  | "amber"
  | "teal"
  | "blue"
  | "coral"
  | "purple"
  | "pink"
  | "green"
  | "gray"
  | "yellow"
  | "orange"
  | "IndianRed"
  | "DarkKhaki"
  | "SeaGreen"
  | "cyan"
  | "lime"
  | "indigo"
  | "rose"
  | "sky"
  | "mint"
  | "lavender"
  | "gold";

export const labelColors: Record<string, TagColor> = {
  "Anthropic API": "teal",
  BeautifulSoup: "pink",
  Flask: "blue",
  GraphQL: "purple",
  IoT: "gray",
  Leaflet: "cyan",
  LoRa: "purple",
  Meshtastic: "blue",
  "Next.js": "coral",
  PostgreSQL: "sky",
  MySQL: "sky",
  Jekyll: "DarkKhaki",
  Wordpress: "lavender",
  React: "blue",
  Tailwind: "amber",
  Python: "green",
  Javascript: "gold",
  Django: "blue",
  Cursor: "purple",
  Claude: "sky",
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
  yellow: "bg-[#2a2406] text-[#f3e48a]",
  orange: "bg-[#2a1406] text-[#f5b07a]",
  IndianRed: "bg-[#2a0d10] text-[#e6a29d]",
  DarkKhaki: "bg-[#242012] text-[#d7cd8c]",
  SeaGreen: "bg-[#071c15] text-[#88d0b2]",
  cyan: "bg-[#071d22] text-[#87d7e4]",
  lime: "bg-[#172106] text-[#b8db74]",
  indigo: "bg-[#0e1028] text-[#adb5f0]",
  rose: "bg-[#250a14] text-[#f2a2be]",
  sky: "bg-[#071926] text-[#95c8f2]",
  mint: "bg-[#081d12] text-[#8dd9b5]",
  lavender: "bg-[#170f26] text-[#cfbaf6]",
  gold: "bg-[#2a1d08] text-[#f3cb7a]",
};
