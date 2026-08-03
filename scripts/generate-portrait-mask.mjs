import { writeFileSync } from "node:fs";

const width = 400;
const height = 500;
const edgeX = width / 8;
const edgeY = height / 8;
const step = 4;

function randomGenerator(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const random = randomGenerator(3545);
const cells = [];

for (let y = 0; y < height; y += step) {
  for (let x = 0; x < width; x += step) {
    const centerX = x + step / 2;
    const centerY = y + step / 2;
    const edgeProgress = Math.min(
      centerX / edgeX,
      (width - centerX) / edgeX,
      centerY / edgeY,
      (height - centerY) / edgeY,
    );

    if (edgeProgress >= 1 || edgeProgress <= 0.04) continue;

    const progress = Math.max(0, Math.min(1, edgeProgress));
    const holeChance = Math.pow(1 - progress, 0.9) * 0.92;
    if (random() > holeChance) continue;

    const size = step * (0.55 + random() * 0.55);
    const jitterX = (random() - 0.5) * step * 0.65;
    const jitterY = (random() - 0.5) * step * 0.65;
    const opacity = Math.min(
      1,
      0.18 + (1 - progress) * (0.58 + random() * 0.34),
    );

    cells.push(
      `<rect x="${(centerX - size / 2 + jitterX).toFixed(2)}" y="${(
        centerY -
        size / 2 +
        jitterY
      ).toFixed(2)}" width="${size.toFixed(2)}" height="${size.toFixed(
        2,
      )}" fill="black" opacity="${opacity.toFixed(3)}"/>`,
    );
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" shape-rendering="crispEdges">
  <defs>
    <linearGradient id="horizontal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="black"/>
      <stop offset="0.125" stop-color="white"/>
      <stop offset="0.875" stop-color="white"/>
      <stop offset="1" stop-color="black"/>
    </linearGradient>
    <linearGradient id="vertical" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="black"/>
      <stop offset="0.125" stop-color="white"/>
      <stop offset="0.875" stop-color="white"/>
      <stop offset="1" stop-color="black"/>
    </linearGradient>
    <mask id="vertical-fade" mask-type="luminance">
      <rect width="${width}" height="${height}" fill="url(#vertical)"/>
    </mask>
    <mask id="organic-edge" mask-type="luminance">
      <rect width="${width}" height="${height}" fill="url(#horizontal)" mask="url(#vertical-fade)"/>
      ${cells.join("\n      ")}
    </mask>
  </defs>
  <rect width="${width}" height="${height}" fill="white" mask="url(#organic-edge)"/>
</svg>
`;

writeFileSync(new URL("../public/media/portrait-edge-mask.svg", import.meta.url), svg);
