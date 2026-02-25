"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import { formatPricePKR } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import type { MockProduct } from "@/data/mock-products";

interface ProductDetailFormProps {
  product: MockProduct;
  relatedProducts: MockProduct[];
}

export function ProductDetailForm({ product, relatedProducts }: ProductDetailFormProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name ?? "");
  const [selectedConnection, setSelectedConnection] = useState(
    product.connection?.[0] ?? ""
  );

  const images = product.images?.length ? product.images : [product.image];

  const { addItem } = useCart();

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    }
  }

  function getVariant() {
    return [selectedColor, selectedConnection].filter(Boolean).join(" / ") || undefined;
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      quantity,
      variant: getVariant(),
    });
  }

  function handleBuyNow() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      quantity,
      variant: getVariant(),
    });
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-12">
        {/* Left: image gallery */}
        <div className="flex flex-1 flex-col gap-2 sm:gap-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/80">
          <Image
            src={images[selectedImageIndex] ?? product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.onSale && (
            <Badge
              variant="default"
              className="absolute bottom-3 left-3 rounded-md px-2 py-0.5 text-xs font-semibold"
            >
              Sale
            </Badge>
          )}
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                className={cn(
                  "relative aspect-square w-full min-h-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors",
                  selectedImageIndex === i
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-border"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.imageAlt} view ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: product info */}
      <div className="flex flex-1 flex-col">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {product.compareAtPrice != null && product.compareAtPrice > product.price && (
            <span className="text-muted-foreground line-through">
              {formatPricePKR(product.compareAtPrice)}
            </span>
          )}
          <span className="text-lg font-semibold text-foreground">
            {formatPricePKR(product.price)}
          </span>
          {product.onSale && (
            <Badge variant="secondary" className="text-xs">
              Sale
            </Badge>
          )}
        </div>

        {product.colors != null && product.colors.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-foreground">
              Color: {selectedColor || product.colors[0]?.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={cn(
                    "size-9 rounded-full border-2 transition-transform touch-manipulation hover:scale-110 sm:size-8",
                    selectedColor === c.name ? "border-primary ring-2 ring-primary/30" : "border-border"
                  )}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {product.connection != null && product.connection.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-foreground">Connection</p>
            <div className="flex flex-wrap gap-2">
              {product.connection.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedConnection(opt)}
                  className={cn(
                    "min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors touch-manipulation sm:min-h-0",
                    selectedConnection === opt
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:bg-muted"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-foreground">Quantity</p>
          <div className="flex w-fit items-center gap-0 rounded-lg border border-border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-r-none touch-manipulation sm:size-9"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </Button>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!Number.isNaN(v) && v >= 1) setQuantity(v);
              }}
              className="h-10 w-14 border-0 text-center touch-manipulation [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:h-9"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-l-none touch-manipulation sm:size-9"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="min-h-11 flex-1 touch-manipulation border-primary text-primary sm:min-h-0"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Button size="lg" className="min-h-11 flex-1 touch-manipulation sm:min-h-0" onClick={handleBuyNow}>
            Buy it now
          </Button>
        </div>

        {product.description && (
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleShare}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Share2 className="size-4" />
          Share
        </button>
      </div>
      </div>

      {/* You may also like - full width below */}
      {relatedProducts.length > 0 && (
        <div className="w-full border-t border-border pt-8 sm:pt-10">
          <h2 className="mb-4 font-serif text-lg font-semibold tracking-tight text-foreground sm:mb-6 sm:text-xl">
            You may also like
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
