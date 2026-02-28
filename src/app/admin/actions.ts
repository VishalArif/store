"use server";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin(): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { error: "Unauthorized. Admin access required." };
  }
  return {};
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
    );
  }
  return { cloudName, apiKey, apiSecret };
}

/** Upload a single image file to Cloudinary; returns secure URL. */
export async function uploadImageAction(formData: FormData): Promise<{ error?: string; url?: string }> {
  const authError = await requireAdmin();
  if (authError.error) return authError;

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return { error: "No file provided." };
  }

  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "store",
      resource_type: "image",
    });

    return { url: result.secure_url };
  } catch (e) {
    console.error("Cloudinary upload error:", e);
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function createProductAction(formData: FormData): Promise<{ error?: string }> {
  const authError = await requireAdmin();
  if (authError.error) return authError;

  const name = formData.get("name");
  const slugInput = formData.get("slug");
  const priceStr = formData.get("price");
  const compareAtPriceStr = formData.get("compareAtPrice");
  const description = formData.get("description");
  const image = formData.get("image"); // URL string (from Cloudinary after upload)
  const imageAlt = formData.get("imageAlt");
  const onSale = formData.get("onSale") === "on" || formData.get("onSale") === "true";
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";

  if (!name || typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }
  if (!priceStr || typeof priceStr !== "string") {
    return { error: "Price is required." };
  }
  const price = parseInt(priceStr, 10);
  if (Number.isNaN(price) || price < 0) {
    return { error: "Invalid price." };
  }

  const slug = slugInput && typeof slugInput === "string" && slugInput.trim()
    ? slugInput.trim().toLowerCase().replace(/\s+/g, "-")
    : slugify(name);

  const imageUrl = typeof image === "string" && image.trim() ? image.trim() : null;
  if (!imageUrl) {
    return { error: "Main image is required. Upload an image first." };
  }

  const compareAtPrice =
    compareAtPriceStr && typeof compareAtPriceStr === "string"
      ? parseInt(compareAtPriceStr, 10)
      : null;

  // Optional: extra images (comma-separated URLs or from form)
  const imagesRaw = formData.get("images");
  const images: string[] = [];
  if (typeof imagesRaw === "string" && imagesRaw.trim()) {
    images.push(...imagesRaw.split(",").map((u) => u.trim()).filter(Boolean));
  }

  // Colors: form can send "colors" as JSON string or we parse repeatable fields
  const colorsRaw = formData.get("colors");
  let colors: { name: string; hex: string }[] = [];
  if (typeof colorsRaw === "string" && colorsRaw.trim()) {
    try {
      const parsed = JSON.parse(colorsRaw) as { name: string; hex: string }[];
      if (Array.isArray(parsed)) colors = parsed;
    } catch {
      // ignore
    }
  }

  // Connection: form can send "connection" as JSON array string
  const connectionRaw = formData.get("connection");
  let connection: string[] = [];
  if (typeof connectionRaw === "string" && connectionRaw.trim()) {
    try {
      const parsed = JSON.parse(connectionRaw) as string[];
      if (Array.isArray(parsed)) connection = parsed;
    } catch {
      // ignore
    }
  }

  try {
    await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        price,
        compareAtPrice: compareAtPrice ?? undefined,
        image: imageUrl,
        imageAlt: (typeof imageAlt === "string" && imageAlt.trim() ? imageAlt.trim() : name.trim()),
        onSale,
        featured,
        description: description && typeof description === "string" ? description.trim() || undefined : undefined,
        images: images.length > 0 ? images : undefined,
        colors: colors.length > 0 ? colors : undefined,
        connection: connection.length > 0 ? connection : undefined,
      },
    });
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin");
    return {};
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") {
      return { error: "A product with this slug already exists." };
    }
    console.error("Create product error:", e);
    return { error: "Failed to create product." };
  }
}

export async function deleteProductAction(productId: string): Promise<{ error?: string }> {
  const authError = await requireAdmin();
  if (authError.error) return authError;

  try {
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin");
    return {};
  } catch (e) {
    console.error("Delete product error:", e);
    return { error: "Failed to delete product." };
  }
}
