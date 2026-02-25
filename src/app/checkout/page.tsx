"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";
import { formatPricePKR } from "@/lib/format-price";
import { cn } from "@/lib/utils";

const SHIPPING_COD = 300;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [shipping, setShipping] = useState<"bank" | "cod">("bank");
  const [billing, setBilling] = useState<"same" | "different">("same");
  const [complete, setComplete] = useState(false);

  const shippingCost = shipping === "cod" ? SHIPPING_COD : 0;
  const total = subtotal + shippingCost;

  if (items.length === 0 && !complete) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button className="mt-6" asChild>
            <Link href="/cart">View cart</Link>
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

  function handleCompleteOrder(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    setComplete(true);
  }

  if (complete) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="mb-4 font-serif text-2xl font-semibold">
            Thank you for your order
          </h1>
          <p className="text-muted-foreground">
            We&apos;ll send you a confirmation email shortly.
          </p>
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
        <h1 className="mb-8 font-serif text-2xl font-semibold">
          SoundForge Audio
        </h1>

        <form onSubmit={handleCompleteOrder}>
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left: form */}
            <div className="flex-1 space-y-8">
              {/* Contact */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Contact</h2>
                  <Link
                    href="/api/auth/signin"
                    className="text-sm text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email or mobile phone number</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email or mobile phone number"
                    required
                    className="mt-1"
                  />
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  Email me with news and offers
                </label>
              </section>

              {/* Delivery */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Delivery</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country/Region</Label>
                    <select
                      id="country"
                      required
                      className="mt-1 h-9 w-full appearance-none rounded-lg border border-input bg-transparent pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                      }}
                    >
                      <option value="PK">Pakistan</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first">First name</Label>
                      <Input id="first" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="last">Last name</Label>
                      <Input id="last" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="apt">
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input id="apt" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="postal">Postal code (optional)</Label>
                      <Input id="postal" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    Save this information for next time
                  </label>
                </div>
              </section>

              {/* Shipping method */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Shipping method</h2>
                <div className="space-y-3">
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
                      shipping === "bank"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === "bank"}
                      onChange={() => setShipping("bank")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Next delivery via TCS or FASTEX depending on location.
                      </p>
                    </div>
                    <span className="font-medium text-primary">FREE</span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
                      shipping === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === "cod"}
                      onChange={() => setShipping("cod")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">
                        Delivery within 4 working days via PostEx
                      </p>
                    </div>
                    <span className="font-medium">
                      {formatPricePKR(SHIPPING_COD)}
                    </span>
                  </label>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="mb-2 text-lg font-semibold">Payment</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  All transactions are secure and encrypted.
                </p>
                <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                  As per shipping method selected.
                </div>
              </section>

              {/* Billing address */}
              <section>
                <h2 className="mb-4 text-lg font-semibold">Billing address</h2>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="billing"
                      checked={billing === "same"}
                      onChange={() => setBilling("same")}
                    />
                    Same as shipping address
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="billing"
                      checked={billing === "different"}
                      onChange={() => setBilling("different")}
                    />
                    Use a different billing address
                  </label>
                </div>
              </section>

              <Button type="submit" size="lg" className="w-full">
                Complete order
              </Button>

              <Link
                href="/cart"
                className="block text-sm text-primary hover:underline"
              >
                Cancellations
              </Link>
            </div>

            {/* Right: order summary */}
            <div className="w-full shrink-0 lg:w-96">
              <div className="sticky top-24 rounded-lg border border-border bg-muted/20 p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -left-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.name}</p>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <span className="font-medium">
                        {formatPricePKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPricePKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0 ? "FREE" : formatPricePKR(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 font-semibold">
                    <span>Total</span>
                    <span>{formatPricePKR(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SoundForge Audio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
