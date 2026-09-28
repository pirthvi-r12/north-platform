import { PrismaClient, Role, ProjectStatus, InvoiceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword) {
    console.log("Skipping user seed: set SEED_ADMIN_PASSWORD in .env to create initial accounts.");
    return;
  }

  const passwordHash = await bcrypt.hash(seedPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@north.studio" },
    update: {},
    create: {
      email: "admin@north.studio",
      name: "North Admin",
      role: Role.ADMIN,
      passwordHash,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@north.studio" },
    update: {},
    create: {
      email: "manager@north.studio",
      name: "Studio Manager",
      role: Role.MANAGER,
      passwordHash,
    },
  });

  const designer = await prisma.user.upsert({
    where: { email: "designer@north.studio" },
    update: {},
    create: {
      email: "designer@north.studio",
      name: "Lead Designer",
      role: Role.DESIGNER,
      passwordHash,
    },
  });

  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "Acme Corp",
      role: Role.CLIENT,
      passwordHash,
    },
  });

  const project = await prisma.project.upsert({
    where: { id: "seed-project-1" },
    update: {},
    create: {
      id: "seed-project-1",
      title: "Acme Rebrand 2026",
      status: ProjectStatus.DESIGN,
      progress: 62,
      budget: 48000,
      deadline: new Date("2026-11-30"),
      clientId: client.id,
      assignedTo: designer.id,
    },
  });

  await prisma.milestone.createMany({
    data: [
      {
        projectId: project.id,
        title: "Discovery & positioning",
        isCompleted: true,
        dueDate: new Date("2026-08-01"),
        sortOrder: 1,
      },
      {
        projectId: project.id,
        title: "Visual identity system",
        isCompleted: true,
        dueDate: new Date("2026-09-15"),
        sortOrder: 2,
      },
      {
        projectId: project.id,
        title: "Digital launch kit",
        isCompleted: false,
        dueDate: new Date("2026-10-20"),
        sortOrder: 3,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.invoice.upsert({
    where: { id: "seed-invoice-1" },
    update: {},
    create: {
      id: "seed-invoice-1",
      projectId: project.id,
      amount: 12000,
      currency: "usd",
      status: InvoiceStatus.UNPAID,
      dueDate: new Date("2026-10-01"),
    },
  });

  await prisma.caseStudy.upsert({
    where: { slug: "acme-rebrand" },
    update: {},
    create: {
      title: "Acme Rebrand",
      slug: "acme-rebrand",
      category: "Brand Identity",
      clientName: "Acme Corp",
      coverImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8ab57cbe?w=800&q=80",
      contentJson: {
        summary: "A warmer, editorial identity for a global retail leader.",
        metrics: { lift: "+34% engagement", timeline: "14 weeks" },
        tags: ["Branding", "Web", "Motion"],
      },
      featured: true,
    },
  });

  await prisma.journalPost.upsert({
    where: { slug: "clarity-is-a-competitive-advantage" },
    update: {},
    create: {
      title: "Clarity is a competitive advantage",
      slug: "clarity-is-a-competitive-advantage",
      excerpt: "Why editorial systems outperform flashy dashboards in client trust.",
      body: "Design systems that breathe — with serif emphasis and warm neutrals — signal craft before a single pixel ships.",
      readMinutes: 6,
    },
  });

  console.log("Seed complete:", { admin: admin.email, manager: manager.email, client: client.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
