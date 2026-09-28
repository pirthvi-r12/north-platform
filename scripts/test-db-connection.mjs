import { PrismaClient } from "@prisma/client";
import { applyDatabaseUrlEnv, mysql2SslOptions } from "./load-db-env.mjs";

applyDatabaseUrlEnv();

const prisma = new PrismaClient();

async function main() {
  const ssl = mysql2SslOptions();
  console.log("DATABASE_URL set:", process.env.DATABASE_URL?.replace(/:([^:@/]+)@/, ":***@"));
  console.log("SSL (mysql2 equivalent):", ssl ?? "disabled");

  await prisma.$queryRaw`SELECT 1 AS ok`;

  const [users, projects, caseStudies, journalPosts] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.caseStudy.count(),
    prisma.journalPost.count(),
  ]);

  console.log("Connection OK. Table counts:");
  console.log({ User: users, Project: projects, CaseStudy: caseStudies, JournalPost: journalPosts });
}

main()
  .catch((err) => {
    console.error("Database connection failed:", err.message ?? err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
