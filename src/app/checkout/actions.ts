"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const SHIPPING_COD = 300;

export type CartItemForOrder = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
};

export async function createOrderAction(
  formData: FormData,
  items: CartItemForOrder[],
  shippingMethod: "bank" | "cod"
): Promise<{ orderId?: string; error?: string }> {
  if (!items.length) {
    return { error: "Cart is empty." };
  }

  const email = formData.get("email");
  const phone = formData.get("phone");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const address = formData.get("address");
  const apartment = formData.get("apartment");
  const city = formData.get("city");
  const postalCode = formData.get("postalCode");
  const country = formData.get("country");

  if (!email || typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }
  if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
    return { error: "First name is required." };
  }
  if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
    return { error: "Last name is required." };
  }
  if (!address || typeof address !== "string" || !address.trim()) {
    return { error: "Address is required." };
  }
  if (!city || typeof city !== "string" || !city.trim()) {
    return { error: "City is required." };
  }
  if (!country || typeof country !== "string" || !country.trim()) {
    return { error: "Country is required." };
  }

  const shippingCost = shippingMethod === "cod" ? SHIPPING_COD : 0;
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + shippingCost;

  try {
    const order = await prisma.order.create({
      data: {
        email: email.trim(),
        phone: phone && typeof phone === "string" ? phone.trim() || undefined : undefined,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: address.trim(),
        apartment: apartment && typeof apartment === "string" ? apartment.trim() || undefined : undefined,
        city: city.trim(),
        postalCode: postalCode && typeof postalCode === "string" ? postalCode.trim() || undefined : undefined,
        country: country.trim(),
        shippingMethod,
        subtotal,
        shippingCost,
        total,
        status: "pending",
      },
    });

    await prisma.orderItem.createMany({
      data: items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant ?? undefined,
      })),
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { orderId: order.id };
  } catch (e) {
    console.error("Create order error:", e);
    return { error: "Failed to place order. Please try again." };
  }
}
