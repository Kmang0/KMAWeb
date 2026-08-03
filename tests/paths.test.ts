import { describe, expect, it } from "vitest";

import { withBasePath } from "@/lib/paths";

describe("withBasePath", () => {
  it("prefixes local media for GitHub Pages without changing external URLs", () => {
    expect(withBasePath("/media/ruka.webp", "/KMAWeb")).toBe(
      "/KMAWeb/media/ruka.webp",
    );
    expect(withBasePath("media/ruka.webp", "/KMAWeb")).toBe(
      "/KMAWeb/media/ruka.webp",
    );
    expect(withBasePath("https://example.com/ruka.webp", "/KMAWeb")).toBe(
      "https://example.com/ruka.webp",
    );
  });
});

