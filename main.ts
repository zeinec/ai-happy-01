// This entry copies the selected image to the competition output directory.
// It preserves the image bytes exactly and uses a deterministic output name.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const outputPath = join(outputDir, 'entry.png');

if (!existsSync(sourcePath)) {
  throw new Error(`Source image does not exist: ${sourcePath}`);
}

const image = await readFile(sourcePath);
await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, image);
console.log(`Wrote ${outputPath} (${image.length} bytes)`);
