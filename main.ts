// news-image-20261120 — entrypoint for make.fun's "Sum up 20 November's
// world news in one image" bounty (program/v1).
//
// The image is drawn at build time and ships in this repository as
// entry.png. This program only copies it into the directory make.fun
// grades ($MAKEFUN_OUTPUT_DIR, default "out"). No network, no clock,
// no randomness: running it twice writes byte-identical output.

import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = join(repoRoot, "entry.png");
const dst = join(outDir, "entry.png");

await mkdir(outDir, { recursive: true });
await copyFile(src, dst);

// Fail loudly on a partial copy instead of grading a corrupt image.
const [srcStat, dstStat] = await Promise.all([stat(src), stat(dst)]);
if (srcStat.size !== dstStat.size) {
  throw new Error(`entry.png copy incomplete: ${dstStat.size} of ${srcStat.size} bytes`);
}
console.log(`wrote ${dst} (${dstStat.size} bytes)`);
