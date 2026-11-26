import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const line = "I waved enthusiastically at a stranger who was waving at the person behind me, then pretended I was stretching my shoulder for three full blocks.";
if ([...line].length < 1 || [...line].length > 200 || /[\r\n]/.test(line)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR || "/output");
const outputPath = resolve(outputDir, "entry.txt");
const expected = `${line}\n`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, expected, "utf8");
if (!readFileSync(outputPath).equals(Buffer.from(expected, "utf8"))) {
  throw new Error("Written entry does not match the expected bytes");
}
