import type { ReactNode } from "react";
import type { ModuleSlug } from "@/config/navigation";
import { ShowcaseModule } from "@/components/modules/ShowcaseModule";
import { ClientPortalModule } from "@/components/modules/ClientPortalModule";
import { CostEstimatorModule } from "@/components/modules/CostEstimatorModule";
import { AiSowModule } from "@/components/modules/AiSowModule";
import { ESignaturesModule } from "@/components/modules/ESignaturesModule";
import { BillingModule } from "@/components/modules/BillingModule";
import { FeedbackCanvasModule } from "@/components/modules/FeedbackCanvasModule";
import { AssetHubModule } from "@/components/modules/AssetHubModule";
import { PerspectivesModule } from "@/components/modules/PerspectivesModule";
import { AnalyticsModule } from "@/components/modules/AnalyticsModule";
import { OnboardingModule } from "@/components/modules/OnboardingModule";
import { GanttModule } from "@/components/modules/GanttModule";
import { ChatModule } from "@/components/modules/ChatModule";
import { VersionControlModule } from "@/components/modules/VersionControlModule";
import { RbacModule } from "@/components/modules/RbacModule";

export const MODULE_COMPONENTS: Record<ModuleSlug, () => ReactNode> = {
  showcase: () => <ShowcaseModule />,
  "client-portal": () => <ClientPortalModule />,
  "cost-estimator": () => <CostEstimatorModule />,
  "ai-sow": () => <AiSowModule />,
  "e-signatures": () => <ESignaturesModule />,
  billing: () => <BillingModule />,
  "feedback-canvas": () => <FeedbackCanvasModule />,
  "asset-hub": () => <AssetHubModule />,
  perspectives: () => <PerspectivesModule />,
  analytics: () => <AnalyticsModule />,
  onboarding: () => <OnboardingModule />,
  gantt: () => <GanttModule />,
  chat: () => <ChatModule />,
  "version-control": () => <VersionControlModule />,
  rbac: () => <RbacModule />,
};
