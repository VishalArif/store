import "server-only";
import { prisma } from "@/lib/prisma";

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  alt: string;
  sortOrder: number;
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const rows = await prisma.heroSlide.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return rows.map((r) => ({
    id: r.id,
    imageUrl: r.imageUrl,
    alt: r.alt,
    sortOrder: r.sortOrder,
  }));
}
