import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCardImage } from "@/components/product-card-image";
import { formatPricePKR } from "@/lib/format-price";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  onSale?: boolean;
}

export function ProductCard({
  name,
  slug,
  price,
  compareAtPrice,
  image,
  imageAlt,
  onSale = false,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card
        size="default"
        className="overflow-hidden border border-border/60 bg-card pt-0 shadow-none ring-0 transition-shadow hover:border-border hover:shadow-md group/card"
      >
        <CardHeader className="relative p-0">
          <div className="relative aspect-square w-full overflow-hidden bg-muted/80">
            <ProductCardImage
              src={image}
              alt={imageAlt}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {onSale && (
              <Badge
                variant="default"
                className="absolute bottom-3 left-3 rounded-md px-2 py-0.5 text-xs font-semibold"
              >
                Sale
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 px-4 pb-4 pt-3">
          <span className="line-clamp-2 text-sm font-medium text-foreground">
            {name}
          </span>
          <div className="flex items-center gap-2 text-sm">
            {compareAtPrice != null && compareAtPrice > price && (
              <span className="text-muted-foreground line-through">
                {formatPricePKR(compareAtPrice)}
              </span>
            )}
            <span className="font-semibold text-foreground">
              {formatPricePKR(price)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
