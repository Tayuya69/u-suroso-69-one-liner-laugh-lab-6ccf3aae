// One-Liner Laugh Lab — entry for u-suroso-69-one-liner-laugh-lab-6ccf3aae.
//
// Prompt: the excuse a robot vacuum gives after eating a sock.
// The program writes exactly one fixed funny line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt outside the grader). No network, no
// clock, no randomness: every run writes the same bytes.
//
// Run with Node 22: `node main.ts`

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The prompt this line answers.
const PROMPT =
  "The excuse a robot vacuum gives after eating a sock.";

// The entry: one line, 84 Unicode code points. The joke turns on a
// first-timer's panic — the vacuum mistakes the sock for a flat, tasty
// cat — a deadpan twist that only fits a vacuum meeting a sock.
const ENTRY =
  "It was my first sock, and I panicked — I thought it was a very flat, very tasty cat.";

const MAX_CHARS = 200;

// Length is counted in Unicode code points, as the gate counts it.
function codePointLength(text: string): number {
  return [...text].length;
}

function validateLine(line: string): void {
  const length = codePointLength(line);
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  validateLine(ENTRY);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  console.log(
    `wrote ${target} (${codePointLength(ENTRY)} characters) for prompt: ${PROMPT}`,
  );
}

main();

// Post-write read-back verification: re-read the file that was just
// written and assert it is exactly the expected line before exiting.
// (Appended as a revision after the first verified runs.)
import { readFileSync as readBackFile } from "node:fs";

{
  const written = readBackFile(join(outputDir(), "entry.txt"), "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the expected line");
  }
  const chars = codePointLength(written);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`read-back length out of range: ${chars} characters`);
  }
  console.log(`verified entry.txt read-back (${chars} characters)`);
}
