import { redirect } from "next/navigation";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const login =
    "/login" +
    (callbackUrl ? "?callbackUrl=" + encodeURIComponent(callbackUrl) : "");
  redirect(login);
}
