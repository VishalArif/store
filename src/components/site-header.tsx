"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/search-overlay";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const isLoggedIn = status === "authenticated" && !!session?.user;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "z-50 w-full",
        isHome ? "absolute top-0 left-0 right-0" : "sticky top-0 bg-background"
      )}
    >
      {/* Announcement bar — hidden on home */}
      {!isHome && (
        <div className="bg-primary px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-primary-foreground sm:px-4">
          Free shipping on orders over Rs. 5,000 PKR
        </div>
      )}

      {/* Main bar: logo, nav (desktop), icons, hamburger (mobile) */}
      <div
        className={cn(
          "mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6 md:gap-6 md:px-8 lg:gap-8 lg:px-12",
          isHome
            ? "border-b border-white/15"
            : "max-w-6xl border-b border-border"
        )}
      >
        {/* Left: logo — tap target on mobile */}
        <Link
          href="/"
          className={cn(
            "min-h-10 min-w-10 font-semibold tracking-tight flex items-center",
            isHome
              ? "text-base text-white sm:text-lg md:text-xl"
              : "text-base text-foreground sm:text-lg"
          )}
        >
          SoundForge Audio
        </Link>

        {/* Center: nav links — visible from md up */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isHome
                    ? "text-white/90 hover:text-white"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: icons + hamburger */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-10 shrink-0 sm:size-9",
              isHome && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-[1.25rem]" />
          </Button>
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:inline-flex size-9 shrink-0",
              isHome && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-label={isLoggedIn ? "Account" : "Sign in"}
            asChild
          >
            <Link href={isLoggedIn ? "/account" : "/login"}>
              <User className="size-[1.25rem]" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative size-10 shrink-0 sm:size-9",
              isHome && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-label={`Cart (${totalItems} items)`}
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="size-[1.25rem]" />
              {totalItems > 0 && (
                <span
                  className={cn(
                    "absolute -right-0.5 -top-0.5 flex size-4 min-w-4 items-center justify-center rounded-full text-[10px] font-medium",
                    isHome
                      ? "bg-white text-primary"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile menu toggle — visible below md */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-10 shrink-0 md:hidden",
              isHome && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 z-40 md:hidden",
          "border-b shadow-lg transition-[visibility,opacity] duration-200",
          isHome
            ? "border-white/15 bg-black/80 backdrop-blur-md"
            : "border-border bg-background",
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className="mx-auto max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                      isHome
                        ? isActive
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                        : isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className={cn("pt-2 mt-2", isHome ? "border-white/15" : "border-border", "border-t")}>
              <Link
                href={isLoggedIn ? "/account" : "/login"}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium",
                  isHome
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="size-5" />
                {isLoggedIn ? "Account" : "Sign in"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
