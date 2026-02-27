import { execSync } from "node:child_process"
import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const src = resolve(root, "src")
const dist = resolve(root, "dist")

// All agent targets to build
const agentFolders = [".claude", ".pi", ".agents", ".opencode"]

// Clean dist
rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

// Compile TypeScript (once, into a temp location)
console.log("Compiling TypeScript...")
const tsBuild = resolve(root, "dist-ts-tmp")
rmSync(tsBuild, { recursive: true, force: true })
execSync("npx tsc", { cwd: root, stdio: "inherit" })
// tsc outputs to dist/ by default — move it to temp
cpSync(dist, tsBuild, { recursive: true })
rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

function walkDir(dir: string): string[] {
  const entries = statSync(dir).isDirectory()
    ? readdirSync(dir).flatMap((e) => walkDir(join(dir, e)))
    : [dir]
  return entries
}

function copyNonTsFiles(srcDir: string, destDir: string) {
  cpSync(srcDir, destDir, {
    recursive: true,
    filter: (source: string) => {
      try {
        if (statSync(source).isDirectory()) return true
      } catch {
        return false
      }
      if (source.endsWith("build.ts")) return false
      return (
        source.endsWith(".md") ||
        source.endsWith(".txt") ||
        (source.endsWith(".json") && !source.includes("node_modules"))
      )
    },
  })
}

function replaceAgentFolder(dir: string, agentFolder: string): number {
  let replacedCount = 0
  for (const filePath of walkDir(dir)) {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".txt")) continue

    const content = readFileSync(filePath, "utf-8")
    if (!content.includes("{AGENT_FOLDER}")) continue

    const updated = content.replaceAll("{AGENT_FOLDER}", agentFolder)
    writeFileSync(filePath, updated)
    replacedCount++
  }
  return replacedCount
}

// Build for each agent target
for (const agentFolder of agentFolders) {
  const agentDist = resolve(dist, agentFolder)
  console.log(`\nBuilding for "${agentFolder}"...`)

  // Copy compiled TS files
  cpSync(tsBuild, agentDist, { recursive: true })

  // Copy non-TS files (markdown, json, txt) on top
  copyNonTsFiles(src, agentDist)

  // Replace {AGENT_FOLDER} placeholder
  const replacedCount = replaceAgentFolder(agentDist, agentFolder)
  console.log(`  Replaced {AGENT_FOLDER} in ${replacedCount} files.`)
}

// Clean up temp TS build
rmSync(tsBuild, { recursive: true, force: true })

console.log("\nBuild complete. Outputs:")
for (const agentFolder of agentFolders) {
  console.log(`  dist/${agentFolder}/`)
}
