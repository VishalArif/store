"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createHeroSlideAction, uploadImageAction } from "@/app/admin/actions";

export function AddHeroSlideForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
    if (result.url) setImageUrl(result.url);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl);
    formData.set("alt", alt);
    const result = await createHeroSlideAction(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setImageUrl("");
    setAlt("");
    router.refresh();
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-lg font-semibold">Add hero slide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {error && (
          <p className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="slide-imageUrl">Image URL *</Label>
            <div className="flex gap-2">
              <Input
                id="slide-imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://… or upload below"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="flex-1"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="sr-only"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                title="Upload image"
              >
                <Upload className="size-4" />
              </Button>
            </div>
            {uploading && <p className="text-muted-foreground text-xs">Uploading…</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slide-alt">Alt text (for accessibility)</Label>
            <Input
              id="slide-alt"
              name="alt"
              placeholder="Describe the image"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading || !imageUrl.trim()}>
            {loading ? "Adding…" : "Add slide"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
