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
    description: "Interactive map of microscopic critters.",
    image: "/screenshots/luti-homepage.png",
    href: "https://lifeundertheice.org",
    tags: [{ label: "React" }, { label: "Leaflet" }],
  },
  {
    title: "Space Probes",
    description: "Humanity's active space probes beyond Earth orbit.",
    image: "/screenshots/spaceprobes-homepage.png",
    tags: [{ label: "Python" }, { label: "Flask" }, { label: "Jekyll" }],
  },
  {
    title: "Spacehack",
    description: "A directory of ways to participate in space exploration.",
    image: "/screenshots/spacehack-homepage.png",
    tags: [{ label: "Javascript" }, { label: "Wordpress" }],
  },
  {
    title: "OPUS",
    description: "NASA Planetary Data System multimission search UI",
    image: "/screenshots/opus-gallery.png",
    tags: [{ label: "Django" }, { label: "Python" }, { label: "Javascript" }],
  },
  // {
  //   title: "CV Zoomies",
  //   description:
  //     "Meshtastic LoRa mesh network node, wall-mounted in Castro Valley.",
  //   image: "/screenshots/cv-zoomies.png",
  //   tags: [{ label: "Meshtastic" }, { label: "LoRa" }, { label: "IoT" }],
  // },
  {
    title: "Seahack",
    description: "A directory of ways to participate in sea exploration.",
    image: "/screenshots/seahack-homepage.png",
    tags: [{ label: "Javascript" }, { label: "Jekyll" }],
  },
  {
    title: "Daily Rings",
    description:
      "Daily posts from NASA's Planetary Ring Systems press release images",
    image: "/screenshots/daily-rings-homepage.png",
    tags: [
      { label: "Django" },
      { label: "Python" },
      { label: "BeautifulSoup" },
      { label: "MySQL" },
    ],
  },
  {
    title: "Mars from Space",
    description: "Images from the Mars Reconnaissance Orbiter",
    image: "/screenshots/mars-from-space-homepage.png",
    tags: [
      { label: "Python" },
      { label: "BeautifulSoup" },
      { label: "Wordpress" },
    ],
  },
  {
    title: "Rocket Weekly tumblr bot",
    description: "Weekly tumblr post of rocket images from NASA",
    image: "/screenshots/rocket-weekly.png",
    tags: [{ label: "Python" }, { label: "BeautifulSoup" }],
  },
  {
    title: "Sunglint tumblr bot",
    description: "Weekly tumblr post of sun glint images from NASA",
    image: "/screenshots/sunglint.png",
    tags: [{ label: "Python" }, { label: "BeautifulSoup" }],
  },
];
