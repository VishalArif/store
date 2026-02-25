import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/data/mock-products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <HeroSection />

        {/* Products appear when user scrolls down */}
        <section
          id="products"
          className="bg-background mx-auto max-w-7xl px-4 py-10 sm:py-14 md:px-6 md:py-16 lg:px-8"
          aria-labelledby="collection-heading"
        >
          <h2
            id="collection-heading"
            className="text-center font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Premium Audio Collection
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group gap-2 rounded-full border-2 border-primary px-8 py-6 text-base font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md"
            >
              <Link href="/products">
                View all products
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
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
