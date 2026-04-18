const LINKS = [
  { label: "GitHub", href: "https://github.com/basilleaf" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lisaballard42/",
  },
  // { label: "Resume", href: "/resume.pdf" },
  {
    label: "lballard.cat@gmail.com",
    href: "mailto:lballard.cat@gmail.com",
  },
] as const;

export default function Footer() {
  return (
    <footer className="flex justify-center gap-6 px-10 mt-8 pt-7 border-t border-[#1a1a1a] flex-wrap text-center">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          // mailto: is often rewritten (e.g. Gmail compose) by extensions before hydrate
          suppressHydrationWarning={link.href.startsWith("mailto:")}
          className="text-[18px] text-[#0e0018] hover:text-[#5d376c] transition-colors duration-150"
        >
          {link.label}
        </a>
      ))}
    </footer>
  );
}
