import { spawnSync } from "node:child_process";
import { applyDatabaseUrlEnv } from "./load-db-env.mjs";

applyDatabaseUrlEnv();

const result = spawnSync("npx", ["tsx", "prisma/seed.ts"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

process.exit(result.status ?? 1);
