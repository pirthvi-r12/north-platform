import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile(filename, override = false) {
  const envPath = join(process.cwd(), filename);
  if (!existsSync(envPath)) {
    return;
  }
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (override || !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

/** Load .env then .env.local (local overrides). */
export function loadDatabaseEnv() {
  loadEnvFile(".env", false);
  loadEnvFile(".env.local", true);
}

export function isDbSslEnabled() {
  loadDatabaseEnv();
  const v = process.env.DB_SSL?.toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

/** Prisma MySQL/TiDB: strict SSL verification (rejectUnauthorized). */
export function appendMysqlSslParams(url) {
  if (!isDbSslEnabled()) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sslaccept=strict`;
}

/** mysql2 driver option when DB_SSL is enabled. */
export function mysql2SslOptions() {
  if (!isDbSslEnabled()) {
    return undefined;
  }
  return { rejectUnauthorized: true };
}

export function buildDatabaseUrl() {
  loadDatabaseEnv();

  let base;
  if (process.env.DATABASE_URL && !process.env.DB_HOST) {
    base = process.env.DATABASE_URL;
  } else {
    const host = process.env.DB_HOST ?? "127.0.0.1";
    const port = process.env.DB_PORT ?? "3306";
    const user = process.env.DB_USER ?? "root";
    const password = process.env.DB_PASSWORD ?? "";
    const name = process.env.DB_NAME ?? "north";

    const encodedUser = encodeURIComponent(user);
    const encodedPassword = encodeURIComponent(password);

    base = `mysql://${encodedUser}:${encodedPassword}@${host}:${port}/${name}`;
  }

  return appendMysqlSslParams(base);
}

export function applyDatabaseUrlEnv() {
  process.env.DATABASE_URL = buildDatabaseUrl();
  return process.env.DATABASE_URL;
}

if (process.argv[1]?.endsWith("load-db-env.mjs")) {
  console.log(applyDatabaseUrlEnv());
}
