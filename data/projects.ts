export type Tag = {
  label: string;
};

export type Project = {
  title: string;
  description: string;
  image: string; // path under /public, e.g. "/screenshots/life-under-ice.png"
  tags: Tag[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Life Under the Ice",
    description:
      "Interactive research map deployed to a kiosk at McMurdo Station, Antarctica. Lead developer.",
    image: "/screenshots/luti-homepage.png",
    href: "https://lifeundertheice.org",
    tags: [{ label: "React" }, { label: "Leaflet" }],
  },
  {
    title: "Space Probes",
    description:
      "Humanity's reach into the solar system. Covered by Wired & Popular Mechanics.",
    image: "/screenshots/spaceprobes-homepage.png",
    tags: [{ label: "React" }, { label: "Flask" }, { label: "Python" }],
  },
  {
    title: "Lit Flashcards",
    description:
      "RAG-powered flashcard generator for classic literature using Project Gutenberg texts.",
    image: "/screenshots/lit-flashcards.png",
    tags: [{ label: "Anthropic API" }, { label: "pgvector" }, { label: "Next.js" }],
  },
  {
    title: "This Site",
    description: "Portfolio built with Next.js + Tailwind, deployed to Vercel.",
    image: "/screenshots/this-site.png",
    tags: [{ label: "Next.js" }, { label: "Tailwind" }, { label: "Vercel" }],
  },
  {
    title: "CV Zoomies",
    description: "Meshtastic LoRa mesh network node, wall-mounted in Castro Valley.",
    image: "/screenshots/cv-zoomies.png",
    tags: [{ label: "Meshtastic" }, { label: "LoRa" }, { label: "IoT" }],
  },
  {
    title: "Zappa Graph",
    description: "Musician relationship graph for Frank Zappa's extended network.",
    image: "/screenshots/zappa-graph.png",
    tags: [{ label: "D3.js" }, { label: "GraphQL" }, { label: "PostgreSQL" }],
  },
];
