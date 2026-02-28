import "server-only";
import { prisma } from "@/lib/prisma";

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });
}
