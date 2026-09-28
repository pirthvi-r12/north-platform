export type ModuleSlug =
  | "showcase"
  | "client-portal"
  | "cost-estimator"
  | "ai-sow"
  | "e-signatures"
  | "billing"
  | "feedback-canvas"
  | "asset-hub"
  | "perspectives"
  | "analytics"
  | "onboarding"
  | "gantt"
  | "chat"
  | "version-control"
  | "rbac";

export interface NavItem {
  index: string;
  slug: ModuleSlug;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { index: "01", slug: "showcase", label: "Showcase", href: "/workspace/showcase" },
  { index: "02", slug: "client-portal", label: "Client Portal", href: "/workspace/client-portal" },
  { index: "03", slug: "cost-estimator", label: "Cost Estimator", href: "/workspace/cost-estimator" },
  { index: "04", slug: "ai-sow", label: "AI SOW Generator", href: "/workspace/ai-sow" },
  { index: "05", slug: "e-signatures", label: "E-Signatures", href: "/workspace/e-signatures" },
  { index: "06", slug: "billing", label: "Billing & Invoices", href: "/workspace/billing" },
  { index: "07", slug: "feedback-canvas", label: "Visual Feedback", href: "/workspace/feedback-canvas" },
  { index: "08", slug: "asset-hub", label: "Digital Asset Hub", href: "/workspace/asset-hub" },
  { index: "09", slug: "perspectives", label: "Perspectives", href: "/workspace/perspectives" },
  { index: "10", slug: "analytics", label: "Analytics", href: "/workspace/analytics" },
  { index: "11", slug: "onboarding", label: "Client Onboarding", href: "/workspace/onboarding" },
  { index: "12", slug: "gantt", label: "Gantt Timeline", href: "/workspace/gantt" },
  { index: "13", slug: "chat", label: "Live Chat", href: "/workspace/chat" },
  { index: "14", slug: "version-control", label: "Version Control", href: "/workspace/version-control" },
  { index: "15", slug: "rbac", label: "RBAC Users", href: "/workspace/rbac" },
];
