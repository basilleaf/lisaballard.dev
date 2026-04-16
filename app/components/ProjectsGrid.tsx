import Image from "next/image";

type Tag = {
  label: string;
  color:
    | "amber"
    | "teal"
    | "blue"
    | "coral"
    | "purple"
    | "pink"
    | "green"
    | "gray";
};

type Project = {
  title: string;
  description: string;
  image: string; // path under /public, e.g. "/screenshots/life-under-ice.png"
  tags: Tag[];
  href?: string;
};

const projects: Project[] = [
  {
    title: "Life Under the Ice",
    description:
      "Interactive research map deployed to a kiosk at McMurdo Station, Antarctica. Lead developer.",
    image: "/screenshots/life-under-ice.png",
    href: "https://lifeundertheice.org",
    tags: [
      { label: "React", color: "blue" },
      { label: "Leaflet", color: "green" },
      { label: "TypeScript", color: "gray" },
      { label: "Kiosk deploy", color: "teal" },
    ],
  },
  {
    title: "Space Probes",
    description:
      "Humanity's reach into the solar system. Covered by Wired & Popular Mechanics.",
    image: "/screenshots/space-probes.png",
    tags: [
      { label: "D3.js", color: "purple" },
      { label: "React", color: "gray" },
      { label: "Data viz", color: "amber" },
    ],
  },
  {
    title: "Lit Flashcards",
    description:
      "RAG-powered flashcard generator for classic literature using Project Gutenberg texts.",
    image: "/screenshots/lit-flashcards.png",
    tags: [
      { label: "Anthropic API", color: "teal" },
      { label: "pgvector", color: "green" },
      { label: "Next.js", color: "gray" },
    ],
  },
  {
    title: "This Site",
    description: "Portfolio built with Next.js + Tailwind, deployed to Vercel.",
    image: "/screenshots/this-site.png",
    tags: [
      { label: "Next.js", color: "coral" },
      { label: "Tailwind", color: "amber" },
      { label: "Vercel", color: "gray" },
    ],
  },
  {
    title: "CV Zoomies",
    description:
      "Meshtastic LoRa mesh network node, wall-mounted in Castro Valley.",
    image: "/screenshots/cv-zoomies.png",
    tags: [
      { label: "Meshtastic", color: "blue" },
      { label: "LoRa", color: "purple" },
      { label: "IoT", color: "gray" },
    ],
  },
  {
    title: "Zappa Graph",
    description:
      "Musician relationship graph for Frank Zappa's extended network.",
    image: "/screenshots/zappa-graph.png",
    tags: [
      { label: "D3.js", color: "pink" },
      { label: "GraphQL", color: "purple" },
      { label: "PostgreSQL", color: "gray" },
    ],
  },
];

const tagStyles: Record<Tag["color"], string> = {
  amber: "bg-[#291800] text-[#FAC775]",
  teal: "bg-[#041a11] text-[#5DCAA5]",
  blue: "bg-[#040f1f] text-[#85B7EB]",
  coral: "bg-[#200e07] text-[#F0997B]",
  purple: "bg-[#100f24] text-[#AFA9EC]",
  pink: "bg-[#1a0811] text-[#ED93B1]",
  green: "bg-[#0d1a06] text-[#97C459]",
  gray: "bg-[#181818] text-[#B4B2A9]",
};

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.href ? "a" : "div";
  const wrapperProps = project.href
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative flex flex-col gap-4 bg-[#111] p-6 cursor-pointer transition-colors duration-200 hover:bg-[#161616]"
    >
      {/* Arrow */}
      <span className="absolute top-5 right-6 text-sm text-[#333] transition-all duration-200 group-hover:text-[#F0EDE6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>

      {/* Screenshot */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h2 className="font-syne font-bold text-[17px] text-[#F0EDE6] tracking-tight leading-tight">
          {project.title}
        </h2>
        <p className="text-[12.5px] text-[#555] leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full tracking-wide ${tagStyles[tag.color]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function ProjectsGrid() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-[#F0EDE6] font-sans pb-12">
      {/* Header */}
      <header className="flex justify-between items-end px-10 pt-10 pb-7 border-b border-[#222]">
        <h1 className="font-syne font-extrabold text-[40px] leading-[1.05] tracking-tight">
          LISA<span className="text-[#D85A30]">.</span>
          <br />
          BALLARD
        </h1>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-[#1D9E75] text-xs font-medium mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            Available for work
          </div>
          <p className="text-[13px] text-[#555] leading-relaxed">
            Senior full-stack engineer
            <br />
            TypeScript · React · GraphQL · PostgreSQL
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="px-10 pt-8">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#444] mb-5">
          Selected work
        </p>

        {/* Hairline-divided grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#1a1a1a] rounded-2xl overflow-hidden divide-x divide-y divide-[#1a1a1a]">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex gap-6 px-10 mt-8 pt-7 border-t border-[#1a1a1a] flex-wrap">
        {[
          { label: "GitHub", href: "https://github.com/yourusername" },
          { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
          { label: "Resume", href: "/resume.pdf" },
          { label: "hello@lisa.dev", href: "mailto:hello@lisa.dev" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13px] text-[#444] hover:text-[#F0EDE6] transition-colors duration-150"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
