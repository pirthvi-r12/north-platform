import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role?: Role }).role ?? "CLIENT";
      }
      if (trigger === "update" && session?.user?.role) {
        token.role = session.user.role as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;
      const publicPaths = ["/login", "/signup", "/api/auth", "/api/stripe/webhook"];
      if (pathname === "/" || publicPaths.some((p) => pathname.startsWith(p))) {
        return true;
      }
      if (!session?.user) {
        return false;
      }
      const role = session.user.role;
      if (pathname.startsWith("/admin")) {
        return role === "ADMIN" || role === "MANAGER";
      }
      if (pathname.startsWith("/client")) {
        return role === "CLIENT";
      }
      return true;
    },
  },
  providers: [],
  trustHost: true,
} satisfies NextAuthConfig;
