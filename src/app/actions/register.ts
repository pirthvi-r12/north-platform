"use server";

import { Role } from "@prisma/client";
import { z } from "zod";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterResult =
  | { success: true; email: string }
  | { success: false; error: string };

export async function registerUser(raw: z.infer<typeof registerSchema>): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? "Invalid registration data";
    return { success: false, error: message };
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.CLIENT;

    const passwordHash = await hashPassword(password);
    await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role,
      },
    });

    return { success: true, email: normalizedEmail };
  } catch {
    return {
      success: false,
      error:
        "Unable to create account. Ensure MySQL is running and run npm run db:push",
    };
  }
}
