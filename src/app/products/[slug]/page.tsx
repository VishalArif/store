import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductDetailForm } from "@/components/product-detail-form";
import {
  getProductBySlug,
  getRelatedProducts,
  getProductSlugs,
} from "@/lib/products";
import { SITE_NAME, SITE_URL } from "@/config/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function absoluteImageUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  const title = product.name;
  const description =
    product.description ||
    `Buy ${product.name} at ${SITE_NAME}. Premium headphones and audio gear.`;
  const imageUrl = product.image ? absoluteImageUrl(product.image) : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [{ url: imageUrl, alt: product.imageAlt || product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, 4);

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
