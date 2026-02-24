import { execSync } from "node:child_process";
import { cpSync, rmSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");

// Clean dist
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Compile TypeScript
console.log("Compiling TypeScript...");
execSync("npx tsc", { cwd: root, stdio: "inherit" });

// Copy non-TS files (markdown, json data files) preserving structure
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

console.log("Build complete.");
