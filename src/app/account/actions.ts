"use server";

import { signIn } from "@/auth";

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
