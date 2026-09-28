import { auth } from "@/lib/auth";
import { LandingPage } from "@/components/landing/LandingPage";

export default async function HomePage() {
  let isAuthenticated = false;
  try {
    const session = await auth();
    isAuthenticated = Boolean(session?.user);
  } catch {
    /* session optional on public landing when database is offline */
  }
  return <LandingPage isAuthenticated={isAuthenticated} />;
}
