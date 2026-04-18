import { type ReactNode } from "react";

export function renderTextWithLinks(text: string) {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = linkPattern.exec(text);

  while (match) {
    const [fullMatch, linkLabel, linkHref] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(
      <a
        key={`${linkHref}-${matchIndex}`}
        href={linkHref}
        rel="noopener noreferrer"
        className="text-[#9a9a9a] underline decoration-[#4a4a4a] underline-offset-2 transition-colors hover:text-[#b5b5b5]"
      >
        {linkLabel}
      </a>,
    );

    lastIndex = matchIndex + fullMatch.length;
    match = linkPattern.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
