export type Tag = {
  label: string;
};

export type Project = {
  title: string;
  description: string;
  image: string; // path under /public, e.g. "/screenshots/life-under-ice.png"
  "detail-image-top": string;
  "detail-image-bottom"?: string;
  "detail-image-top-alt": string;
  "detail-image-bottom-alt"?: string;
  tags: Tag[];
  bullets?: string[];
  href?: string;
  "more-info-link"?: string;
  "more-info-text"?: string;
};

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** URL segment for `/project/{projectName}` — derived from the display title. */
export function projectSlug(project: Project): string {
  return slugifyTitle(project.title);
}

export const projects: Project[] = [
  {
    title: "Portfolio site",
    description: "This Website - A vibe coded basic portfolio",
    image: "/screenshots/portfolio-site-homepage.png",
    "detail-image-top": "/screenshots/portfolio-site-homepage.png",
    "detail-image-bottom": "/screenshots/portfolio-site-detail.png",
    "detail-image-top-alt": "Portfolio homepage screenshot",
    "detail-image-bottom-alt": "Portfolio detail screenshot",
    tags: [{ label: "Next.js" }, { label: "Cursor" }, { label: "Claude" }],
    bullets: [
      "Next.js Portfolio built with Cursor and Claude",
      "Mobile responsive design",
      "Next and Previous buttons and mobile swipe gestures for project navigation",
      "Distinct URL for each project",
    ],
  },
  {
    title: "Life Under the Ice",
    description:
      "Interactive map of microscopic creatures collected in Antarctica.",
    image: "/screenshots/luti-homepage.png",
    "detail-image-top": "/screenshots/luti-homepage.png",
    "detail-image-bottom": "/screenshots/luti-detail.png",
    "detail-image-top-alt": "Life Under the Ice homepage screenshot",
    "detail-image-bottom-alt": "Life Under the Ice map view screenshot",
    href: "https://lifeundertheice.org",
    tags: [{ label: "React" }, { label: "Leaflet" }],
    bullets: [
      "Leaflet map with HLS streaming video tile overlays",
      "Interactive content elements with React",
      "Keyboard Accessible",
      "Deployed to a kiosk at McMurdo Station, Antarctica",
    ],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "https://lifeundertheice.org/about",
  },
  {
    title: "Space Probes",
    description: "Humanity's active space probes beyond Earth orbit.",
    image: "/screenshots/spaceprobes-homepage.png",
    "detail-image-top": "/screenshots/spaceprobes-homepage.png",
    "detail-image-bottom": "/screenshots/spaceprobes-detail.png",
    "detail-image-top-alt": "Space Probes homepage screenshot",
    "detail-image-bottom-alt": "Space Probes content screenshot",
    href: "https://spaceprob.es",
    tags: [{ label: "Python" }, { label: "Flask" }, { label: "Jekyll" }],
    bullets: [
      "Automated scraping of news stories and Deep Space Network spacecraft data with Python & Beautiful Soup",
      "Latest news aggregator scraper and admin built with Python & Flask",
      "Distances API endpoint built with Flask",
      "Site built with Jekyll",
    ],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "https://spaceprob.es/about/",
  },
  {
    title: "Daily Rings",
    description:
      "Daily posts from NASA's Planetary Ring Systems press release images",
    image: "/screenshots/daily-rings-homepage.png",
    "detail-image-top": "/screenshots/daily-rings-homepage.png",
    "detail-image-top-alt": "Daily Rings homepage screenshot",
    tags: [
      { label: "Django" },
      { label: "Python" },
      { label: "BeautifulSoup" },
      { label: "MySQL" },
    ],
    bullets: [
      "Automated content scraper built with Python & Beautiful Soup.",
      "Website built with Django & MySQL.",
      "Automated daily posting to social media sites with Python & 3rd party APIs.",
    ],
  },
  {
    title: "OPUS",
    description:
      "NASA Planetary Data System multimission search UI. Designed to help researchers and the public discover mission data across multiple planetary datasets",
    image: "/screenshots/opus-gallery.png",
    "detail-image-top": "/screenshots/opus-gallery.png",
    "detail-image-bottom": "/screenshots/opus.png",
    "detail-image-top-alt": "OPUS gallery screenshot",
    "detail-image-bottom-alt": "OPUS search results screenshot",
    tags: [
      { label: "Django" },
      { label: "Python" },
      { label: "Javascript" },
      { label: "MySQL" },
    ],
    bullets: [
      "Site built with Django, Python, JavaScript",
      "Data injestion pipeline built with object oriented PHP",
    ],
    "more-info-text": "NASA Planetary Data System, Ring-Moon Systems Node",
    "more-info-link": "https://pds-rings.seti.org/",
  },
  // {
  //   title: "CV Zoomies",
  //   description:
  //     "Meshtastic LoRa mesh network node, wall-mounted in Castro Valley.",
  //   image: "/screenshots/cv-zoomies.png",
  //   tags: [{ label: "Meshtastic" }, { label: "LoRa" }, { label: "IoT" }],
  // },
  {
    title: "Mars from Space",
    description: "Images from the Mars Reconnaissance Orbiter",
    image: "/screenshots/mars-from-space-homepage.png",
    "detail-image-top": "/screenshots/mars-from-space-homepage.png",
    "detail-image-bottom": "/screenshots/mars-from-space-detail.png",
    "detail-image-top-alt": "Mars from Space homepage screenshot",
    "detail-image-bottom-alt": "Mars from Space gallery screenshot",
    tags: [
      { label: "Python" },
      { label: "BeautifulSoup" },
      { label: "Wordpress" },
    ],
    bullets: [
      "Data Scraped from NASA HiRise website using Python & Beautiful Soup",
      "Wordpress posts generated via python script",
      "Created at Mars Hackathon",
    ],
    "more-info-link": "https://marsfromspace.com/about/",
  },

  {
    title: "Spacehack",
    description: "A directory of ways to participate in space exploration.",
    image: "/screenshots/spacehack-homepage.png",
    "detail-image-top": "/screenshots/spacehack-homepage.png",
    "detail-image-bottom": "/screenshots/spacehack-detail.png",
    "detail-image-top-alt": "Spacehack homepage screenshot",
    "detail-image-bottom-alt": "Spacehack directory screenshot",
    tags: [{ label: "Javascript" }, { label: "Wordpress" }],
    href: "https://spacehack.org",
    bullets: ["Site built with Jekyll."],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "spacehack.org/about/",
  },
  {
    title: "Seahack",
    description: "A directory of ways to participate in sea exploration.",
    image: "/screenshots/seahack-homepage.png",
    "detail-image-top": "/screenshots/seahack-homepage.png",
    "detail-image-bottom": "/screenshots/seahack-detail.png",
    "detail-image-top-alt": "Seahack homepage screenshot",
    "detail-image-bottom-alt": "Seahack directory screenshot",
    tags: [{ label: "Javascript" }, { label: "Jekyll" }],
    bullets: [
      "Built with JavaScript and Jekyll",
      "Highlights opportunities and organizations people can join to get involved in sea exploration",
    ],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "https://arielwaldman.com/",
  },
  {
    title: "Rocket Weekly tumblr bot",
    description: "Weekly tumblr post of rocket-related images from NASA",
    image: "/screenshots/rocket-weekly.png",
    "detail-image-top": "/screenshots/rocket-weekly.png",
    "detail-image-top-alt": "Rocket Weekly Tumblr bot screenshot",
    tags: [{ label: "Python" }, { label: "BeautifulSoup" }],
    bullets: [
      "Data scraped from NASA using Python & Beautiful Soup",
      "Automated tumblr posting with Python script",
    ],
  },
  {
    title: "Sunglint tumblr bot",
    description: "Weekly tumblr post of sun glint images from NASA",
    image: "/screenshots/sunglint.png",
    "detail-image-top": "/screenshots/sunglint.png",
    "detail-image-top-alt": "Sunglint Tumblr bot screenshot",
    tags: [{ label: "Python" }, { label: "BeautifulSoup" }],
    bullets: [
      "Data scraped from NASA using Python & Beautiful Soup",
      "Automated tumblr posting with Python script",
    ],
  },
];

export function getProjectBySlug(segment: string): Project | undefined {
  const normalized = decodeURIComponent(segment).trim().toLowerCase();
  return projects.find((p) => slugifyTitle(p.title) === normalized);
}
