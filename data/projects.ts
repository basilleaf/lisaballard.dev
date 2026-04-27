export type Tag = {
  label: string;
};

export type Project = {
  title: string;
  description: string;
  image: string; // path under /public, e.g. "/screenshots/life-under-ice.png"
  "detail-image-first": string;
  "detail-image-second"?: string;
  "detail-image-first-alt": string;
  "detail-image-second-alt"?: string;
  tags: Tag[];
  /** Plain text; use `[label](https://url)` anywhere in a bullet for an inline link. */
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
    title: "Go See Art SF",
    description:
      "Auto-updating feed of current art exhibitions across select San Francisco museums",
    image: "/screenshots/go-see-art-homepage.png",
    "detail-image-first": "/screenshots/go-see-art-homepage.png",
    "detail-image-second": "/screenshots/go-see-art-detail.png",
    "detail-image-first-alt": "Go See Art SF homepage screenshot",
    "detail-image-second-alt": "Go See Art SF detail page screenshot",
    href: "https://go-see-art-sf-11o7.vercel.app/",
    tags: [
      { label: "Next.js" },
      { label: "Claude" },
      { label: "React" },
      { label: "TypeScript" },
    ],
    bullets: [
      "Aggregates current and upcoming art exhibitions across 9 San Francisco museums into a single browsable feed",
      "Custom scrapers per museum using fetch + node-html-parser, handling varied site structures including WordPress, Wix, and custom CMSes",
      "AI-synthesized summaries grounded in retrieved descriptions via Anthropic Claude API",
      "Weekly automated scraping via GitHub Actions cron; scrapers are idempotent and upsert by canonical exhibition URL",
      "Card grid homepage ordered by closing date; detail pages include full image with credit, date range, description, and link to museum",
      "Built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Drizzle ORM, and Neon Postgres",
    ],
  },
  {
    title: "Ambient Mixer",
    description: "Calm sound layers - vibe coded audio mixing app",
    image: "/screenshots/ambient-mixer-homepage.png",
    "detail-image-first": "/screenshots/ambient-mixer-homepage.png",
    "detail-image-second": "/screenshots/ambient-mixer-detail.png",
    "detail-image-first-alt": "Ambient Mixer homepage screenshot",
    "detail-image-second-alt":
      "Ambient Mixer screenshot of night theme and in debug mode",
    href: "https://ambient-mixer-xi.vercel.app/",
    tags: [{ label: "Next.js" }, { label: "React" }, { label: "TypeScript" }],
    bullets: [
      "Browser-based ambient sound mixer. Stack rain, ocean, crickets, ambient music layers, and more as independent layers with per-track volume",
      "Seamless looping without harsh cuts, dual HTMLAudio players per track with timed crossfades before each loop boundary",
      "Shareable/bookmarkable mixes via query string: which tracks are playing and each volume level sync to the URL",
      "Hydration from the URL on load so shared links resume the same soundscape; optional “Play all” for the visible subset",
      "Night theme toggle for dark UI styling tuned for evening use",
      "Built-in debug mode to surface app state and playback diagnostics (add debug=true to URL)",
      "Built with Next.js App Router, React 19, TypeScript, Tailwind CSS",
      "Unit tests for button visibilty logic and URL-state behavior with Jest + React Testing Library",
      "[github.com/basilleaf/ambient-mixer](https://github.com/basilleaf/ambient-mixer)",
    ],
  },
  {
    title: "Ask Oscar",
    description: "Semantic search across Oscar Wilde works",
    image: "/screenshots/ask-oscar-homepage.png",
    "detail-image-first": "/screenshots/ask-oscar-homepage.png",
    "detail-image-second": "/screenshots/ask-oscar-detail.png",
    "detail-image-first-alt": "Ask Oscar homepage screenshot",
    "detail-image-second-alt":
      "Ask Oscar homepage scrolled down to search results screenshot",
    href: "https://ask-oscar.vercel.app/",
    tags: [
      { label: "Next.js" },
      { label: "Pgvector" },
      { label: "Voyage AI" },
      { label: "Claude" },
      { label: "PostgreSQL" },
    ],
    bullets: [
      "RAG-powered search app that surfaces verbatim passages from all six Oscar Wilde books using natural language queries",
      "Semantic search via pgvector (HNSW index) and Voyage AI embeddings stored in Neon PostgreSQL",
      "AI-synthesized summaries grounded in retrieved passages via Anthropic Claude API",
      "Custom data ingestion pipeline fetching, cleaning, and chunking ~6,500 paragraphs from Project Gutenberg plaintext files",
      "Drizzle ORM for schema and queries; raw SQL for vector similarity search",
      "Rate limiting with Upstash Redis to protect open endpoints",
      "Built with Next.js App Router, TypeScript, Shadcn UI, and Tailwind CSS, deployed to Vercel",
      "[github.com/basilleaf/ask-oscar](https://github.com/basilleaf/ask-oscar)",
    ],
  },
  {
    title: "Ask Jane",
    description: "Semantic search across Jane Austen's novels",
    image: "/screenshots/ask-jane-homepage.png",
    "detail-image-first": "/screenshots/ask-jane-homepage.png",
    "detail-image-second": "/screenshots/ask-jane-detail.png",
    "detail-image-first-alt": "Ask Jane homepage screenshot",
    "detail-image-second-alt":
      "Ask Jane homepage scrolled down to search results screenshot",
    href: "https://ask-jane.vercel.app/",
    tags: [
      { label: "Next.js" },
      { label: "Pgvector" },
      { label: "Voyage AI" },
      { label: "Claude" },
      { label: "PostgreSQL" },
    ],
    bullets: [
      "RAG-powered search app that surfaces verbatim passages from all six Austen novels using natural language queries",
      "Semantic search via pgvector (HNSW index) and Voyage AI embeddings stored in Neon PostgreSQL",
      "AI-synthesized summaries grounded in retrieved passages via Anthropic Claude API",
      "Custom data ingestion pipeline fetching, cleaning, and chunking ~6,500 paragraphs from Project Gutenberg plaintext files",
      "Drizzle ORM for schema and queries; raw SQL for vector similarity search",
      "Rate limiting with Upstash Redis to protect open endpoints",
      "Built with Next.js App Router, TypeScript, Shadcn UI, and Tailwind CSS, deployed to Vercel",
      "[github.com/basilleaf/ask-jane](https://github.com/basilleaf/ask-jane)",
    ],
  },
  {
    title: "Flash Card App",
    description: "Subscription Flashcard App with free and pro plans",
    image: "/screenshots/flashy-cardy-course.png",
    "detail-image-first": "/screenshots/flashy-cardy-course.png",
    "detail-image-second": "/screenshots/flashy-cardy-course-detail.png",
    "detail-image-first-alt": "Flashcard app homepage screenshot",
    "detail-image-second-alt": "Flashcard app detail screenshot",
    tags: [
      { label: "Next.js" },
      { label: "Cursor" },
      { label: "Claude" },
      { label: "PostgreSQL" },
    ],
    bullets: [
      "Coursework from [Udemy course](https://www.udemy.com/course/learn-cursor-ai/) built with Next.js, agentic code assist with Cursor and Claude",
      "AI card generation feature via Claude api integration",
      "Extended the coursework by adding full unit test coverage with Vitest",
      "Authentication, authorization, and billing with Clerk",
      "Relational data using Drizzle ORM and Neon PostgreSQL",
      "Responsive UI with Shadcn UI & Tailwind CSS",
      "[github.com/basilleaf/flashy-cardy-course](https://github.com/basilleaf/flashy-cardy-course)",
    ],
  },
  {
    title: "Portfolio site",
    description: "This Website - vibe coded basic portfolio",
    image: "/screenshots/portfolio-site-homepage.png",
    "detail-image-first": "/screenshots/portfolio-site-homepage.png",
    "detail-image-second": "/screenshots/portfolio-site-detail.png",
    "detail-image-first-alt": "Portfolio homepage screenshot",
    "detail-image-second-alt": "Portfolio detail screenshot",
    tags: [{ label: "Next.js" }, { label: "Cursor" }, { label: "Claude" }],
    bullets: [
      "Next.js Portfolio built with Cursor and Claude",
      "Mobile responsive design",
      "Next and Previous buttons and mobile swipe gestures for project navigation",
      "Distinct URL for each project",
      "[github.com/basilleaf/lisaballard.dev](https://github.com/basilleaf/lisaballard.dev)",
    ],
  },
  {
    title: "Life Under the Ice",
    description:
      "Interactive map of microscopic creatures collected in Antarctica.",
    image: "/screenshots/luti-homepage.png",
    "detail-image-first": "/screenshots/luti-homepage.png",
    "detail-image-second": "/screenshots/luti-detail.png",
    "detail-image-first-alt": "Life Under the Ice homepage screenshot",
    "detail-image-second-alt": "Life Under the Ice map view screenshot",
    href: "https://lifeundertheice.org",
    tags: [{ label: "React" }, { label: "Leaflet" }],
    bullets: [
      "Leaflet map with HLS streaming video tile overlays",
      "Interactive content elements with React",
      "Keyboard Accessible",
      "Deployed to a kiosk at McMurdo Station, Antarctica",
      "[github.com/spacehackers/luti](https://github.com/spacehackers/luti)",
    ],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "https://lifeundertheice.org/about",
  },
  {
    title: "Space Probes",
    description: "Humanity's active space probes beyond Earth orbit.",
    image: "/screenshots/spaceprobes-homepage.png",
    "detail-image-first": "/screenshots/spaceprobes-homepage.png",
    "detail-image-second": "/screenshots/spaceprobes-detail.png",
    "detail-image-first-alt": "Space Probes homepage screenshot",
    "detail-image-second-alt": "Space Probes content screenshot",
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
    "detail-image-first": "/screenshots/daily-rings-homepage.png",
    "detail-image-first-alt": "Daily Rings homepage screenshot",
    tags: [
      { label: "Django" },
      { label: "Python" },
      { label: "BeautifulSoup" },
      { label: "MySQL" },
    ],
    bullets: [
      "Automated content scraper built with Python & Beautiful Soup.",
      "Website built with Django & MySQL.",
      "Automated daily posting to social media sites with Python & social APIs.",
    ],
  },
  {
    title: "OPUS",
    description:
      "NASA Planetary Data System multi-mission search UI. Designed to help researchers and the public discover mission data across multiple planetary datasets",
    image: "/screenshots/opus-gallery.png",
    "detail-image-first": "/screenshots/opus-gallery.png",
    "detail-image-second": "/screenshots/opus.png",
    "detail-image-first-alt": "OPUS gallery screenshot",
    "detail-image-second-alt": "OPUS search results screenshot",
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
    description:
      "Images and content from Mars Reconnaissance Orbiter HiRise Instrument team",
    image: "/screenshots/mars-from-space-homepage.png",
    "detail-image-first": "/screenshots/mars-from-space-homepage.png",
    "detail-image-second": "/screenshots/mars-from-space-detail.png",
    "detail-image-first-alt": "Mars from Space homepage screenshot",
    "detail-image-second-alt": "Mars from Space gallery screenshot",
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
    "detail-image-first": "/screenshots/spacehack-homepage.png",
    "detail-image-second": "/screenshots/spacehack-detail.png",
    "detail-image-first-alt": "Spacehack homepage screenshot",
    "detail-image-second-alt": "Spacehack directory screenshot",
    tags: [{ label: "Javascript" }, { label: "Wordpress" }],
    href: "https://spacehack.org",
    bullets: ["Site built with Jekyll."],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "http://spacehack.org/about/",
  },
  {
    title: "Seahack",
    description: "A directory of ways to participate in sea exploration.",
    image: "/screenshots/seahack-homepage.png",
    "detail-image-first": "/screenshots/seahack-homepage.png",
    "detail-image-second": "/screenshots/seahack-detail.png",
    "detail-image-first-alt": "Seahack homepage screenshot",
    "detail-image-second-alt": "Seahack directory screenshot",
    tags: [{ label: "Javascript" }, { label: "Jekyll" }],
    bullets: ["Built with JavaScript and Jekyll"],
    "more-info-text": "credit: Ariel Waldman",
    "more-info-link": "https://arielwaldman.com/",
  },
  {
    title: "Rocket Weekly tumblr bot",
    description: "Weekly tumblr post of rocket-related images from NASA",
    image: "/screenshots/rocket-weekly.png",
    "detail-image-first": "/screenshots/rocket-weekly.png",
    "detail-image-first-alt": "Rocket Weekly Tumblr bot screenshot",
    tags: [{ label: "Python" }, { label: "BeautifulSoup" }],
    bullets: [
      "Data scraped from NASA using Python & Beautiful Soup",
      "Automated tumblr posting with Python script",
    ],
  },
  {
    title: "Sunglint tumblr bot",
    description: "Daily tumblr post of sun glint images from NASA",
    image: "/screenshots/sunglint.png",
    "detail-image-first": "/screenshots/sunglint.png",
    "detail-image-first-alt": "Sunglint Tumblr bot screenshot",
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
