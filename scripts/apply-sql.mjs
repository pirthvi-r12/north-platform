import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { applyDatabaseUrlEnv, buildDatabaseUrl, isDbSslEnabled } from "./load-db-env.mjs";

const root = process.cwd();
const sqlFile = join(root, "sql", "north.sql");

function parseMysqlUrl(url) {
  const match = url.match(/^mysql:\/\/([^:]+):([^@]*)@([^:/]+):(\d+)\/([^?]+)/);
  if (!match) {
    return null;
  }
  return {
    user: decodeURIComponent(match[1]),
    password: decodeURIComponent(match[2]),
    host: match[3],
    port: match[4],
    database: match[5],
  };
}

function runMysql(filePath, config) {
  const sql = readFileSync(filePath, "utf8");
  const args = [
    "-h",
    config.host,
    "-P",
    config.port,
    "-u",
    config.user,
    ...(config.password ? [`-p${config.password}`] : []),
    ...(isDbSslEnabled() ? ["--ssl-mode=VERIFY_IDENTITY"] : []),
  ];

  const result = spawnSync("mysql", args, {
    input: sql,
    stdio: ["pipe", "inherit", "inherit"],
    shell: process.platform === "win32",
  });

  if (result.error?.code === "ENOENT") {
    return false;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  return true;
}

if (!existsSync(sqlFile)) {
  console.error("Missing sql/north.sql");
  process.exit(1);
}

applyDatabaseUrlEnv();
const config = parseMysqlUrl(buildDatabaseUrl());
if (!config) {
  console.error("Invalid DATABASE_URL. Expected mysql://user:pass@host:port/db");
  process.exit(1);
}

console.log("Applying MySQL database:", sqlFile);
console.log(`Target: ${config.user}@${config.host}:${config.port}/${config.database}`);

const applied = runMysql(sqlFile, config);
if (!applied) {
  console.error("Could not run mysql CLI. Install MySQL client or use: npm run db:push");
  process.exit(1);
}

console.log("NORTH database applied successfully.");
console.log("Run: npm run db:generate");
