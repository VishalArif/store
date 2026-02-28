import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { Headphones } from "lucide-react";

const COVER_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "admin" ? "/admin" : "/account");
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Headphones className="size-4" />
            </div>
            SoundForge Audio
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<div className="h-[320px] animate-pulse rounded-lg bg-muted" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={COVER_IMAGE}
          alt=""
          fill
          sizes="50vw"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
