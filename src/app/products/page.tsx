import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ProductsListing } from "@/components/products-listing";
import { getAllProducts } from "@/lib/products";
import { SITE_NAME, SITE_DESCRIPTION } from "@/config/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse our full collection of premium headphones and audio gear. ${SITE_DESCRIPTION}`,
  openGraph: {
    title: `Products | ${SITE_NAME}`,
    description: `Browse our full collection of premium headphones and audio gear.`,
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section
          className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8"
          aria-labelledby="products-heading"
        >
          <h1
            id="products-heading"
            className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground sm:mb-8 sm:text-3xl"
          >
            Products
          </h1>

          <ProductsListing products={products} />
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-xs text-muted-foreground sm:text-sm">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
