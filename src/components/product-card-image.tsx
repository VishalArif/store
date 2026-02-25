"use client";

import Image from "next/image";
import { useState } from "react";
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

export function ProductCardImage({ src, alt, sizes, className }: ProductCardImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full items-center justify-center bg-muted",
          className
        )}
        aria-hidden
      >
        <Headphones className="size-12 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover transition-transform duration-300 group-hover/card:scale-105", className)}
      onError={() => setError(true)}
    />
  );
}
