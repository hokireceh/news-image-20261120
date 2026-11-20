// news-image-20261120 — entrypoint for make.fun's "Sum up 20 November's
// world news in one image" bounty (program/v1).
//
// The image is drawn at build time and ships in this repository as
// entry.png. This program only copies it into the directory make.fun
// grades ($MAKEFUN_OUTPUT_DIR, default "out"). No network, no clock,
// no randomness: running it twice writes byte-identical output.

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

await mkdir(outDir, { recursive: true });
await copyFile(join(repoRoot, "entry.png"), join(outDir, "entry.png"));
