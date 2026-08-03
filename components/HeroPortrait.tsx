"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { withBasePath } from "@/lib/paths";

const PORTRAIT_SRC = "/media/portrait.jpg";
const PORTRAIT_MASK_SRC = "/media/portrait-edge-mask.svg";

export function HeroPortrait() {
  const [src, setSrc] = useState<string | null>(null);
  const resolved = withBasePath(
    PORTRAIT_SRC,
    process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  );
  const mask = withBasePath(
    PORTRAIT_MASK_SRC,
    process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  );
  const maskStyle = {
    WebkitMaskImage: `url("${mask}")`,
    maskImage: `url("${mask}")`,
  } satisfies CSSProperties;

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setSrc(resolved);
    image.onerror = () => setSrc(null);
    image.src = resolved;
  }, [resolved]);

  return (
    <figure className="hero__portrait">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Kenny Ma"
          className="hero__portrait-image"
          style={maskStyle}
        />
      ) : (
        <div className="hero__portrait-fallback" role="note">
          <span>Portrait slot</span>
          <strong>Add portrait.jpg</strong>
          <p>Drop your photo at public/media/portrait.jpg</p>
        </div>
      )}
    </figure>
  );
}
