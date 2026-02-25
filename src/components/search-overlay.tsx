"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { searchProducts } from "@/data/mock-products";
import { formatPricePKR } from "@/lib/format-price";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = query.trim() ? searchProducts(query) : [];
  const hasQuery = query.trim().length > 0;

  // Suggestions: show the query and first product name if any
  const suggestions = hasQuery
    ? [query.trim(), ...results.slice(0, 2).map((p) => p.name)]
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSearchFor = useCallback(() => {
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [query, onClose, router]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center bg-black/50 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
    >
      {/* Search bar + panel (stop propagation so clicking them doesn't close) */}
      <div
        className="flex w-full max-w-2xl flex-col items-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-1 items-center rounded-lg border border-border bg-background shadow-lg">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted-foreground"
            autoComplete="off"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
          <span className="border-l border-border py-2 pl-2 pr-3 text-muted-foreground">
            <Search className="size-5" />
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground"
          aria-label="Close search"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Dropdown panel */}
      {hasQuery && (
        <div className="mt-0 flex w-full max-w-2xl flex-col overflow-hidden rounded-b-lg border border-t-0 border-border bg-background shadow-lg">
          {suggestions.length > 0 && (
            <div className="border-b border-border px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Suggestions
              </p>
              <ul className="space-y-1">
                {[...new Set(suggestions)].slice(0, 3).map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="w-full text-left text-sm text-foreground hover:bg-muted/50"
                      onClick={() => {
                        setQuery(s);
                        inputRef.current?.focus();
                      }}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.length > 0 && (
            <div className="px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Products
              </p>
              <ul className="space-y-2">
                {results.slice(0, 4).map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPricePKR(product.price)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-border px-4 py-3">
            <button
              type="button"
              onClick={handleSearchFor}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors",
                "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Search for &quot;{query.trim()}&quot;
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
