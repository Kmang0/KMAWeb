import { check, LinkState } from "linkinator";

const result = await check({
  path: "out",
  recurse: true,
  checkCss: true,
  checkFragments: true,
  requireHttps: "error",
  linksToSkip: ["^mailto:"],
  statusCodes: { "403": "warn" },
  urlRewriteExpressions: [
    {
      pattern: /KMAWeb[\\/]/,
      replacement: "",
    },
  ],
});

const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
for (const link of broken) {
  console.error(`[broken] ${link.url}`);
}

if (!result.passed) process.exitCode = 1;

