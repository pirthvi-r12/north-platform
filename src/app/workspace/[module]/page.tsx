import { notFound } from "next/navigation";
import { NAV_ITEMS, type ModuleSlug } from "@/config/navigation";
import { MODULE_COMPONENTS } from "@/components/modules/module-registry";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export function generateStaticParams() {
  return NAV_ITEMS.map((item) => ({ module: item.slug }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  const slug = module as ModuleSlug;
  const render = MODULE_COMPONENTS[slug];
  if (!render) {
    notFound();
  }
  return <div>{render()}</div>;
}
