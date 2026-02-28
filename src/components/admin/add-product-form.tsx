"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { uploadImageAction, createProductAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export function AddProductForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: "", hex: "#000000" },
  ]);
  const connectionOptions = ["Wireless", "Wired"];
  const [selectedConnections, setSelectedConnections] = useState<string[]>([
    "Wireless",
  ]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadImageAction(formData);
    setUploading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.url) setMainImageUrl(result.url);
    e.target.value = "";
  }

  function addColor() {
    setColors((c) => [...c, { name: "", hex: "#000000" }]);
  }

  function removeColor(i: number) {
    setColors((c) => c.filter((_, idx) => idx !== i));
  }

  function updateColor(i: number, field: "name" | "hex", value: string) {
    setColors((c) => {
      const next = [...c];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  }

  function toggleConnection(opt: string) {
    setSelectedConnections((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("image", mainImageUrl);
    formData.set(
      "colors",
      JSON.stringify(colors.filter((c) => c.name.trim()))
    );
    formData.set("connection", JSON.stringify(selectedConnections));
    const result = await createProductAction(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Basic info */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg font-semibold">
            Basic information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-0">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Product name *</FieldLabel>
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g. Studio Pro Wireless"
                className="w-full"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="slug">URL slug (optional)</FieldLabel>
              <Input
                id="slug"
                name="slug"
                placeholder="Auto-generated from name"
                className="w-full text-muted-foreground"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe the product for customers"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg font-semibold">
            Pricing (PKR)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-0 sm:flex-row sm:gap-6">
          <Field className="flex-1">
            <FieldLabel htmlFor="price">Price *</FieldLabel>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              required
              placeholder="50000"
              className="w-full"
            />
          </Field>
          <Field className="flex-1">
            <FieldLabel htmlFor="compareAtPrice">Compare at price (optional)</FieldLabel>
            <Input
              id="compareAtPrice"
              name="compareAtPrice"
              type="number"
              min={0}
              placeholder="55000"
              className="w-full"
            />
          </Field>
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg font-semibold">
            Main image *
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="sr-only"
          />
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={cn(
              "flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors",
              mainImageUrl
                ? "border-primary/50 bg-primary/5"
                : "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50",
              uploading && "pointer-events-none opacity-60"
            )}
          >
            {uploading ? (
              <p className="text-sm text-muted-foreground">Uploading…</p>
            ) : mainImageUrl ? (
              <>
                <p className="text-sm font-medium text-foreground">Image uploaded</p>
                <p className="text-xs text-muted-foreground">Click to replace</p>
              </>
            ) : (
              <>
                <Upload className="size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Choose image to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or WebP
                </p>
              </>
            )}
          </div>
          <Field>
            <FieldLabel htmlFor="imageAlt">Image alt text</FieldLabel>
            <Input
              id="imageAlt"
              name="imageAlt"
              placeholder="Describe the image for accessibility"
              className="w-full"
            />
          </Field>
          <input type="hidden" name="image" value={mainImageUrl} />
        </CardContent>
      </Card>

      {/* Variants */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg font-semibold">
            Variants
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div>
            <Label className="mb-2 block text-sm font-medium">Colors (optional)</Label>
            <div className="flex flex-col gap-2">
              {colors.map((c, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <Input
                    placeholder="Color name"
                    value={c.name}
                    onChange={(e) => updateColor(i, "name", e.target.value)}
                    className="h-9 w-full min-w-0 max-w-[180px]"
                  />
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => updateColor(i, "hex", e.target.value)}
                    className="h-9 w-14 cursor-pointer rounded-lg border border-input"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 text-muted-foreground hover:text-destructive"
                    onClick={() => removeColor(i)}
                    aria-label="Remove color"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={addColor}
              >
                <Plus className="size-4" />
                Add color
              </Button>
            </div>
          </div>
          <div>
            <Label className="mb-2 block text-sm font-medium">Connection</Label>
            <div className="flex flex-wrap gap-2">
              {connectionOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleConnection(opt)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedConnections.includes(opt)
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:bg-muted"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg font-semibold">
            Visibility
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-6 pt-0">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="onSale"
              className="size-4 rounded border-input"
            />
            <span className="text-sm font-medium">On sale</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              className="size-4 rounded border-input"
            />
            <span className="text-sm font-medium">Featured on homepage</span>
          </label>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={loading || !mainImageUrl} size="lg">
          {loading ? "Creating…" : "Create product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
