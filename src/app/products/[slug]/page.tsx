import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductDetailForm } from "@/components/product-detail-form";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/data/mock-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-8">
          <ProductDetailForm product={product} relatedProducts={relatedProducts} />
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-xs text-muted-foreground sm:text-sm">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
