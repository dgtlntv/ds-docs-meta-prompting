import { execSync } from "node:child_process";
import {
  cpSync,
  rmSync,
  mkdirSync,
  statSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve, join } from "node:path";
import { globSync } from "node:fs";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");

// Agent folder name — the directory these files will live under in a project
// e.g. ".claude" produces paths like @.claude/dockit/references/sections.md
const agentFolder = process.env.AGENT_FOLDER ?? ".claude";

// Clean dist
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Compile TypeScript
console.log("Compiling TypeScript...");
execSync("npx tsc", { cwd: root, stdio: "inherit" });

// Copy non-TS files (markdown, json, txt) preserving structure
console.log("Copying markdown and data files...");
cpSync(src, dist, {
  recursive: true,
  filter: (source: string) => {
    // Always recurse into directories
    try {
      if (statSync(source).isDirectory()) return true;
    } catch {
      return false;
    }
    // Skip the build script itself
    if (source.endsWith("build.ts")) return false;
    // Copy markdown, json, and txt files, skip everything else
    return (
      source.endsWith(".md") ||
      source.endsWith(".txt") ||
      (source.endsWith(".json") && !source.includes("node_modules"))
    );
  },
});

// Replace {AGENT_FOLDER} placeholder in all copied text files
console.log(`Replacing {AGENT_FOLDER} with "${agentFolder}"...`);
let replacedCount = 0;

function walkDir(dir: string): string[] {
  const entries = statSync(dir).isDirectory()
    ? readdirSync(dir).flatMap((e) => walkDir(join(dir, e)))
    : [dir];
  return entries;
}

import { readdirSync } from "node:fs";

for (const filePath of walkDir(dist)) {
  if (!filePath.endsWith(".md") && !filePath.endsWith(".txt")) continue;

  const content = readFileSync(filePath, "utf-8");
  if (!content.includes("{AGENT_FOLDER}")) continue;

  const updated = content.replaceAll("{AGENT_FOLDER}", agentFolder);
  writeFileSync(filePath, updated);
  replacedCount++;
}

console.log(`  Replaced in ${replacedCount} files.`);
console.log("Build complete.");
