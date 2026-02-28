"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/types/product";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Alphabetically, A-Z" },
  { value: "name-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
] as const;

const PRICE_OPTIONS = [
  { value: "all", label: "All prices" },
  { value: "0-25000", label: "Under Rs. 25,000" },
  { value: "25000-50000", label: "Rs. 25,000 – Rs. 50,000" },
  { value: "50000-100000", label: "Rs. 50,000 – Rs. 100,000" },
  { value: "100000+", label: "Rs. 100,000 & above" },
] as const;

interface ProductsListingProps {
  products: Product[];
}

export function ProductsListing({ products }: ProductsListingProps) {
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0].value);
  const [availability, setAvailability] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    if (availability === "in-stock") list = list.filter(() => true);
    if (availability === "out-of-stock") list = [];

    if (priceRange !== "all") {
      if (priceRange === "0-25000") list = list.filter((p) => p.price < 25000);
      else if (priceRange === "25000-50000")
        list = list.filter((p) => p.price >= 25000 && p.price < 50000);
      else if (priceRange === "50000-100000")
        list = list.filter((p) => p.price >= 50000 && p.price < 100000);
      else if (priceRange === "100000+") list = list.filter((p) => p.price >= 100000);
    }

    if (sort === "name-asc")
      list = list.toSorted((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc")
      list = list.toSorted((a, b) => b.name.localeCompare(a.name));
    else if (sort === "price-asc") list = list.toSorted((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = list.toSorted((a, b) => b.price - a.price);

    return list;
  }, [products, sort, availability, priceRange]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter and sort — stacked on mobile, row on tablet+ */}
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-3 md:text-sm">
        {/* Filters row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <span className="text-muted-foreground text-sm">Filter:</span>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="h-9 w-full min-w-0 border-border/80 bg-background sm:h-8 sm:w-[120px]" size="default">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-9 w-full min-w-0 border-border/80 bg-background sm:h-8 sm:w-[130px]" size="default">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="hidden text-border md:inline md:mx-1">|</span>
        {/* Sort row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-muted-foreground text-sm">Sort by:</span>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-9 w-full min-w-0 border-border/80 bg-background sm:h-8 sm:w-[180px]" size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground text-sm">
            {filteredAndSorted.length} product{filteredAndSorted.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Product grid — 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {filteredAndSorted.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No products match your filters.
        </p>
      )}
    </div>
  );
}
