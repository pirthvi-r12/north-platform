/** 4K-ready Unsplash URLs (w=3840) for agency / brand / product visuals */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=3840&q=90`;

/** Verified CDN fallback if a remote cover fails to load */
export const IMAGE_FALLBACK = u("photo-1497215728101-856f4ea42174");

export const demoCaseStudies = [
  {
    id: "cs1",
    title: "Acme Rebrand",
    slug: "acme-rebrand",
    category: "Brand Identity",
    clientName: "Acme Corp",
    coverImage: u("photo-1561070791-2526d30994b5"),
    contentJson: {
      summary: "Editorial identity system with warm neutrals, serif emphasis, and launch-ready assets.",
      metrics: { lift: "+34%", timeline: "14 weeks" },
    },
  },
  {
    id: "cs2",
    title: "Northwind SaaS",
    slug: "northwind-saas",
    category: "Product Design",
    clientName: "Northwind",
    coverImage: u("photo-1558655146-9f40138edfeb"),
    contentJson: {
      summary: "Full product UI for a B2B dashboard with glass panels and motion-led onboarding.",
      metrics: { lift: "+21%", timeline: "10 weeks" },
    },
  },
  {
    id: "cs3",
    title: "Harbor Finance",
    slug: "harbor-finance",
    category: "Web Platform",
    clientName: "Harbor Capital",
    coverImage: u("photo-1551288049-bebda4e38f71"),
    contentJson: {
      summary: "Trust-first fintech storytelling with live analytics and client portal integration.",
      metrics: { lift: "+18%", timeline: "16 weeks" },
    },
  },
  {
    id: "cs4",
    title: "Lumen Retail",
    slug: "lumen-retail",
    category: "Brand Identity",
    clientName: "Lumen",
    coverImage: u("photo-1611532736579-6b16e2b50449"),
    contentJson: {
      summary: "Retail rebrand spanning packaging, signage, and a shoppable editorial site.",
      metrics: { lift: "+27%", timeline: "12 weeks" },
    },
  },
  {
    id: "cs5",
    title: "Atlas Mobility",
    slug: "atlas-mobility",
    category: "Product Design",
    clientName: "Atlas",
    coverImage: u("photo-1552664730-d307ca884978"),
    contentJson: {
      summary: "Mobility app UX with 3D hero moments and conversion-optimized booking flows.",
      metrics: { lift: "+31%", timeline: "11 weeks" },
    },
  },
  {
    id: "cs6",
    title: "Studio Meridian",
    slug: "studio-meridian",
    category: "Web Platform",
    clientName: "Meridian Group",
    coverImage: u("photo-1497366216548-37526070297c"),
    contentJson: {
      summary: "Corporate site with case study engine, RBAC client workspace, and Stripe billing.",
      metrics: { lift: "+22%", timeline: "9 weeks" },
    },
  },
  {
    id: "cs7",
    title: "Copper & Clay",
    slug: "copper-clay",
    category: "Brand Identity",
    clientName: "Copper & Clay",
    coverImage: u("photo-1600880292203-757bb62b4baf"),
    contentJson: {
      summary: "Artisan brand world — photography direction, tone of voice, and ecommerce UI.",
      metrics: { lift: "+19%", timeline: "8 weeks" },
    },
  },
];

export const demoInvoices = [
  {
    id: "inv-001",
    projectTitle: "Acme Rebrand 2026",
    amount: 12000,
    currency: "usd",
    status: "UNPAID" as const,
    dueDate: "2026-10-01",
  },
  {
    id: "inv-002",
    projectTitle: "Northwind SaaS Platform",
    amount: 18500,
    currency: "usd",
    status: "PAID" as const,
    dueDate: "2026-09-12",
  },
  {
    id: "inv-003",
    projectTitle: "Harbor Finance Web",
    amount: 9200,
    currency: "usd",
    status: "OVERDUE" as const,
    dueDate: "2026-08-20",
  },
  {
    id: "inv-004",
    projectTitle: "Lumen Retail Launch",
    amount: 7400,
    currency: "usd",
    status: "PAID" as const,
    dueDate: "2026-09-28",
  },
  {
    id: "inv-005",
    projectTitle: "Atlas Mobility App",
    amount: 21000,
    currency: "usd",
    status: "UNPAID" as const,
    dueDate: "2026-11-15",
  },
  {
    id: "inv-006",
    projectTitle: "Studio Meridian Portal",
    amount: 5600,
    currency: "usd",
    status: "PAID" as const,
    dueDate: "2026-09-05",
  },
  {
    id: "inv-007",
    projectTitle: "Copper & Clay Ecommerce",
    amount: 6800,
    currency: "usd",
    status: "UNPAID" as const,
    dueDate: "2026-10-22",
  },
];

export const demoDesignVersions = [
  {
    id: "v1",
    label: "Initial concept",
    date: "2026-08-12",
    image: u("photo-1558655146-d09347e92766"),
    notes: "Exploring layout rhythm and typography scale.",
  },
  {
    id: "v2",
    label: "Brand direction A",
    date: "2026-08-28",
    image: u("photo-1561070791-2526d30994b5"),
    notes: "Warm pearl surfaces with deep red accents.",
  },
  {
    id: "v3",
    label: "Client feedback round",
    date: "2026-09-10",
    image: u("photo-1551288049-bebda4e38f71"),
    notes: "Refined hero and milestone modules.",
  },
  {
    id: "v4",
    label: "Current iteration",
    date: "2026-09-20",
    image: u("photo-1611532736579-6b16e2b50449"),
    notes: "Production-ready NORTH® workspace UI.",
  },
  {
    id: "v5",
    label: "Launch candidate",
    date: "2026-10-05",
    image: u("photo-1497366216548-37526070297c"),
    notes: "Final polish for client sign-off.",
  },
];

export const demoMilestones = [
  { id: "m1", title: "Discovery & positioning", isCompleted: true, dueDate: "2026-08-01" },
  { id: "m2", title: "Visual identity system", isCompleted: true, dueDate: "2026-09-15" },
  { id: "m3", title: "Digital launch kit", isCompleted: false, dueDate: "2026-10-20" },
  { id: "m4", title: "Final handoff", isCompleted: false, dueDate: "2026-11-30" },
];

export const demoAssets = [
  { id: "a1", name: "Logo Master.ai", fileType: "AI", sizeBytes: 2400000 },
  { id: "a2", name: "Icon Set.svg", fileType: "SVG", sizeBytes: 890000 },
  { id: "a3", name: "Brand Guidelines.pdf", fileType: "PDF", sizeBytes: 5200000 },
];

export const demoJournal = [
  {
    id: "j1",
    title: "Clarity is a competitive advantage",
    slug: "clarity",
    excerpt: "Why editorial systems outperform flashy dashboards in client trust.",
    readMinutes: 6,
    body: "Warm cream surfaces, obsidian type, and burgundy emphasis create calm authority. When clients open your portal, they should feel oriented — not overwhelmed. NORTH® treats every module as part of one editorial story: milestones, invoices, and feedback share the same visual language. That consistency reduces anxiety and speeds approvals.",
  },
  {
    id: "j2",
    title: "Designing for decision velocity",
    slug: "decision-velocity",
    excerpt: "Milestone transparency reduces revision cycles across enterprise teams.",
    readMinutes: 4,
    body: "Clients approve faster when progress is visible, measurable, and human. Pair live milestone bars with contextual chat and version compare, and revision cycles shrink. Decision velocity is not about rushing — it is about removing ambiguity at every step of the engagement.",
  },
];

/** Public Figma community — Simple Design System */
export const FIGMA_EMBED_SRC =
  "https://www.figma.com/embed?embed_host=north&url=" +
  encodeURIComponent(
    "https://www.figma.com/design/lS4R44bC8A2GuBP3JAJ9sh/Simple-Design-System--Community-",
  );

export const FIGMA_PROTOTYPE_FALLBACK_IMAGE = u("photo-1558655146-9f40138edfeb");
