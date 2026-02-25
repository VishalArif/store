"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { searchProducts } from "@/data/mock-products";

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const results = query.trim() ? searchProducts(query) : [];

  if (!query.trim()) {
    return (
      <p className="text-muted-foreground">
        Enter a search term to find products.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found for “{query}”.</p>
        <Button className="mt-4" asChild>
          <Link href="/products">View all products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {results.length} product{results.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
