import { describe, expect, it } from "vitest";
import { isValidElement, type ComponentPropsWithoutRef } from "react";
import { renderTextWithLinks } from "./renderTextWithLinks";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function expectLink(
  node: unknown,
  expected: { label: string; href: string },
): void {
  expect(isValidElement(node)).toBe(true);
  if (!isValidElement(node) || node.type !== "a") {
    throw new Error("expected <a> element");
  }
  const props = node.props as AnchorProps;
  expect(props.href).toBe(expected.href);
  expect(props.rel).toBe("noopener noreferrer");
  expect(props.children).toBe(expected.label);
  expect(typeof props.className).toBe("string");
}

describe("renderTextWithLinks", () => {
  it("returns plain text as a single string node when there are no links", () => {
    const nodes = renderTextWithLinks("hello world");
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toBe("hello world");
  });

  it("returns empty string as a single node", () => {
    const nodes = renderTextWithLinks("");
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toBe("");
  });

  it("renders a single https link", () => {
    const nodes = renderTextWithLinks("[label](https://example.com/path)");
    expect(nodes).toHaveLength(1);
    expectLink(nodes[0], {
      label: "label",
      href: "https://example.com/path",
    });
  });

  it("renders a single http link", () => {
    const nodes = renderTextWithLinks("[site](http://example.org)");
    expect(nodes).toHaveLength(1);
    expectLink(nodes[0], {
      label: "site",
      href: "http://example.org",
    });
  });

  it("preserves text before and after a link", () => {
    const nodes = renderTextWithLinks(
      'Before [middle](https://a.com) after',
    );
    expect(nodes).toHaveLength(3);
    expect(nodes[0]).toBe("Before ");
    expectLink(nodes[1], { label: "middle", href: "https://a.com" });
    expect(nodes[2]).toBe(" after");
  });

  it("handles multiple links with text between them", () => {
    const nodes = renderTextWithLinks(
      '[one](https://a.com) and [two](http://b.org)',
    );
    expect(nodes).toHaveLength(3);
    expectLink(nodes[0], { label: "one", href: "https://a.com" });
    expect(nodes[1]).toBe(" and ");
    expectLink(nodes[2], { label: "two", href: "http://b.org" });
  });

  it("does not treat non-http(s) URLs as links", () => {
    const raw = "[x](ftp://files.example)";
    const nodes = renderTextWithLinks(raw);
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toBe(raw);
  });

  it("uses distinct keys when the same URL appears twice", () => {
    const nodes = renderTextWithLinks(
      '[a](https://same.com) [b](https://same.com)',
    );
    expect(nodes).toHaveLength(3);
    expectLink(nodes[0], { label: "a", href: "https://same.com" });
    expect(nodes[1]).toBe(" ");
    expectLink(nodes[2], { label: "b", href: "https://same.com" });
    if (isValidElement(nodes[0]) && isValidElement(nodes[2])) {
      expect(nodes[0].key).not.toBe(nodes[2].key);
    }
  });
});
