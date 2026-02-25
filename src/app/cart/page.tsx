"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPricePKR } from "@/lib/format-price";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="mb-4 font-serif text-xl font-semibold sm:mb-6 sm:text-2xl">
            Your cart
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Your cart is empty.
          </p>
          <Button className="mt-6 min-h-11 w-full sm:w-auto" asChild>
            <Link href="/products">Continue shopping</Link>
          </Button>
        </main>
        <footer className="border-t border-border bg-muted/30 py-6 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-6 font-serif text-xl font-semibold sm:mb-8 sm:text-2xl">
          Your cart
        </h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-lg border border-border p-3 sm:gap-4 sm:p-4"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-24 sm:w-24"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-medium text-foreground hover:underline line-clamp-2 text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-9 shrink-0 touch-manipulation sm:size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-7 text-center text-sm sm:w-8">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-9 shrink-0 touch-manipulation sm:size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold sm:text-base">
                        {formatPricePKR(item.price * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 shrink-0 text-destructive touch-manipulation hover:bg-destructive/10 sm:size-8"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full shrink-0 rounded-lg border border-border bg-muted/30 p-4 sm:p-6 lg:w-80">
            <p className="mb-1 text-xs text-muted-foreground sm:mb-2 sm:text-sm">
              Subtotal
            </p>
            <p className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              {formatPricePKR(subtotal)}
            </p>
            <Button className="min-h-11 w-full touch-manipulation" size="lg" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
            <Link
              href="/products"
              className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground sm:mt-4 sm:text-sm"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-border bg-muted/30 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-xs text-muted-foreground sm:text-sm">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
