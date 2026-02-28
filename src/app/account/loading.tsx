import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-12 w-full">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="rounded-lg border border-border bg-card p-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-2 h-5 w-56" />
          <div className="mt-6 flex flex-col gap-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <Skeleton className="mt-6 mx-auto h-4 w-32" />
      </main>
      <footer className="border-t border-border bg-muted/30 py-6 mt-auto">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Skeleton className="h-3 w-48 mx-auto" />
        </div>
      </footer>
    </div>
  );
}
