"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function signInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl") ?? "/";

  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return { error: "Email and password are required." };
  }

  const result = await signIn("credentials", {
    email: email.trim().toLowerCase(),
    password,
    redirectTo: typeof callbackUrl === "string" ? callbackUrl : "/",
    redirect: false,
  });

  if (result?.error) return { error: "Invalid email or password." };
  return { success: true, url: typeof callbackUrl === "string" ? callbackUrl : "/" };
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const callbackUrl = formData.get("callbackUrl") ?? "/";

  const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
  const passwordStr = typeof password === "string" ? password : "";
  const confirmStr = typeof confirmPassword === "string" ? confirmPassword : "";

  if (!emailStr) return { error: "Email is required." };
  if (!passwordStr) return { error: "Password is required." };
  if (passwordStr.length < 8) return { error: "Password must be at least 8 characters." };
  if (passwordStr !== confirmStr) return { error: "Passwords do not match." };

  const existing = await prisma.user.findUnique({ where: { email: emailStr } });
  if (existing) return { error: "An account with this email already exists." };

  const passwordHash = await bcrypt.hash(passwordStr, 10);
  await prisma.user.create({
    data: {
      email: emailStr,
      passwordHash,
      name: typeof name === "string" && name.trim() ? name.trim() : null,
      role: "user",
    },
  });

  const result = await signIn("credentials", {
    email: emailStr,
    password: passwordStr,
    redirectTo: typeof callbackUrl === "string" ? callbackUrl : "/",
    redirect: false,
  });

  if (result?.error) return { error: "Account created. Please sign in." };
  return { success: true, url: typeof callbackUrl === "string" ? callbackUrl : "/" };
}
