import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export type { Product };

function mapPrismaProduct(p: {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  imageAlt: string;
  onSale: boolean;
  description: string | null;
  images: unknown;
  colors: unknown;
  connection: unknown;
  featured: boolean;
}): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    image: p.image,
    imageAlt: p.imageAlt,
    onSale: p.onSale,
    description: p.description ?? undefined,
    images: Array.isArray(p.images) ? (p.images as string[]) : undefined,
    colors: Array.isArray(p.colors)
      ? (p.colors as { name: string; hex: string }[])
      : undefined,
    connection: Array.isArray(p.connection) ? (p.connection as string[]) : undefined,
    featured: p.featured,
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const list = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return list.map(mapPrismaProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  const list = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });
  return list.map(mapPrismaProduct);
}

/** For SSG/SEO: return all product slugs for static params generation. */
export async function getProductSlugs(): Promise<string[]> {
  const list = await prisma.product.findMany({
    select: { slug: true },
    orderBy: { name: "asc" },
  });
  return list.map((p) => p.slug);
}

/** Cached per-request so generateMetadata and page share one DB call. */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const p = await prisma.product.findUnique({
    where: { slug },
  });
  return p ? mapPrismaProduct(p) : null;
});

export async function getRelatedProducts(
  productId: string,
  limit = 4
): Promise<Product[]> {
  const list = await prisma.product.findMany({
    where: { id: { not: productId } },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return list.map(mapPrismaProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  const list = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { name: "asc" },
  });
  return list.map(mapPrismaProduct);
}
