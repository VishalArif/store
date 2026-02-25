"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1920&q=80",
    alt: "Over-ear headphones on a dark surface",
  },
  {
    src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1920&q=80",
    alt: "Headphones with carrying case",
  },
  {
    src: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1920&q=80",
    alt: "Gaming headset on desk",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&q=80",
    alt: "White wireless headphones",
  },
];

const INTERVAL = 5000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      className="relative flex h-dvh w-full flex-col justify-between overflow-hidden"
      aria-label="Hero"
    >
      {/* Full-bleed landscape images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Gradient overlays for text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"
        aria-hidden
      />

      {/* Content — safe area for notched devices */}
      <div className="relative z-10 flex h-full flex-col justify-between px-4 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-24 md:px-8 md:pt-28 lg:px-12 lg:pt-32">
        {/* Headline — scales for mobile and tablet */}
        <div className="pt-2 sm:pt-4 md:pt-6">
          <h1 className="max-w-3xl font-serif font-normal lowercase leading-[1.05] tracking-tight text-white text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            premium sound
            <br />
            crafted for you
          </h1>
        </div>

        {/* Bottom bar: counter + tagline + CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Slide counter */}
            <div className="flex items-center gap-3 text-xs text-white/80 sm:text-sm">
              <span className="font-medium text-white">{pad(current + 1)}</span>
              <span className="h-px w-8 bg-white/40 sm:w-10" />
              <span>{pad(total)}</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-white/85 sm:text-sm">
              A sense of clarity, immersion and focus — a world shaped by sound
              and built for the way you listen.
            </p>
          </div>

          <Button
            size="lg"
            asChild
            className="w-full min-h-12 rounded-full border border-white/50 bg-white/10 px-6 py-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white sm:w-fit sm:min-h-0 sm:px-8 sm:py-6 sm:text-base"
          >
            <Link href="/products">shop now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
