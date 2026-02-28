import Image from "next/image";
import { getHeroSlides } from "@/lib/hero-slides";
import { AddHeroSlideForm } from "@/components/admin/add-hero-slide-form";
import { DeleteSlideButton } from "@/components/admin/delete-slide-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminSlidesPage() {
  const slides = await getHeroSlides();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Hero slides
        </h1>
        <p className="text-muted-foreground text-sm">
          Images shown in the hero carousel on the homepage. Order is by sort order.
        </p>
      </div>

      <AddHeroSlideForm />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Current slides</CardTitle>
            <CardDescription>
              {slides.length === 0
                ? "No slides yet. Add one above; the hero will use fallback images until then."
                : `${slides.length} slide${slides.length === 1 ? "" : "s"}`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {slides.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No hero slides yet. Add slides above to show them on the homepage.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slides.map((slide, i) => (
                <li
                  key={slide.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-border"
                >
                  <div className="relative aspect-video w-full bg-muted">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.alt || `Slide ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-3 py-2">
                    <span className="text-muted-foreground truncate text-xs">
                      {slide.alt || `Slide ${i + 1}`}
                    </span>
                    <DeleteSlideButton slideId={slide.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
