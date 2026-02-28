import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getOrderById } from "@/lib/orders";
import { formatPricePKR } from "@/lib/format-price";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders">← Orders</Link>
          </Button>
        </div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Order #{order.id.slice(-6).toUpperCase()}
        </h1>
        <p className="text-sm text-muted-foreground">
          Placed {formatDate(order.createdAt)}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <OrderStatusBadge status={order.status} />
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">
              {order.firstName} {order.lastName}
            </p>
            <p className="text-muted-foreground">{order.email}</p>
            {order.phone && (
              <p className="text-muted-foreground">{order.phone}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>
              {order.address}
              {order.apartment ? `, ${order.apartment}` : ""}
            </p>
            <p>
              {order.city}
              {order.postalCode ? ` ${order.postalCode}` : ""}
            </p>
            <p>{order.country}</p>
            <p className="pt-2 font-medium text-foreground">
              Payment: {order.shippingMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Variant</th>
                  <th className="p-3 font-medium text-right">Qty</th>
                  <th className="p-3 font-medium text-right">Price</th>
                  <th className="p-3 font-medium text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {item.variant ?? "—"}
                    </td>
                    <td className="p-3 text-right">{item.quantity}</td>
                    <td className="p-3 text-right">
                      {formatPricePKR(item.price)}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {formatPricePKR(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col items-end gap-1 border-t border-border pt-4 text-sm">
            <div className="flex w-full max-w-xs justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPricePKR(order.subtotal)}</span>
            </div>
            <div className="flex w-full max-w-xs justify-between">
              <span className="text-muted-foreground">Shipping fee</span>
              <span>
                {order.shippingCost === 0
                  ? "FREE"
                  : formatPricePKR(order.shippingCost)}
              </span>
            </div>
            <div className="flex w-full max-w-xs justify-between pt-2 font-semibold">
              <span>Total</span>
              <span>{formatPricePKR(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
