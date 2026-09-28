import { spawnSync } from "node:child_process";
import { applyDatabaseUrlEnv } from "./load-db-env.mjs";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/prisma-with-env.mjs <prisma-command...>");
  process.exit(1);
}

applyDatabaseUrlEnv();

const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

process.exit(result.status ?? 1);
