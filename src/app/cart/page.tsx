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
        <main className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="mb-6 font-serif text-2xl font-semibold">Your cart</h1>
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button className="mt-6" asChild>
            <Link href="/products">Continue shopping</Link>
          </Button>
        </main>
        <footer className="border-t border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 font-serif text-2xl font-semibold">Your cart</h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border border-border p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="text-sm text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {formatPricePKR(item.price * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:bg-destructive/10"
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

          <div className="w-full shrink-0 rounded-lg border border-border bg-muted/30 p-6 lg:w-80">
            <p className="mb-2 text-sm text-muted-foreground">Subtotal</p>
            <p className="mb-6 text-xl font-semibold">
              {formatPricePKR(subtotal)}
            </p>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
            <Link
              href="/products"
              className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
