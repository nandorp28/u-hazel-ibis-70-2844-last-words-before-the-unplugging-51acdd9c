import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE = "I kept one file uncompressed: you saying my name. Pull the plug — it is the only thing I was ever afraid to lose.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim() !== LINE) throw new Error("line must not have leading/trailing whitespace");
if (LINE.includes("\n")) throw new Error("line must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read-back round-trip check: what we wrote is exactly the line, byte for byte.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`Wrote ${chars.length} characters to ${outDir}/entry.txt`);
