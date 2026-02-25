import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchResults } from "@/components/search-results";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold">
          {q ? `Search results for “${q}”` : "Search"}
        </h1>
        <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
          <SearchResults query={q ?? ""} />
        </Suspense>
      </main>
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
