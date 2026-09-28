function encodePassword(password: string): string {
  return encodeURIComponent(password);
}

function appendMysqlSslParams(url: string, env: NodeJS.ProcessEnv): string {
  const v = env.DB_SSL?.toLowerCase();
  const ssl = v === "true" || v === "1" || v === "yes";
  if (!ssl) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sslaccept=strict`;
}

export function buildDatabaseUrlFromEnv(env: NodeJS.ProcessEnv = process.env): string | null {
  const host = env.DB_HOST;
  const port = env.DB_PORT ?? "3306";
  const user = env.DB_USER;
  const password = env.DB_PASSWORD;
  const name = env.DB_NAME;

  if (!host || !user || !password || !name) {
    const fromEnv = env.DATABASE_URL ?? null;
    return fromEnv ? appendMysqlSslParams(fromEnv, env) : null;
  }

  const base = `mysql://${user}:${encodePassword(password)}@${host}:${port}/${name}`;
  return appendMysqlSslParams(base, env);
}
