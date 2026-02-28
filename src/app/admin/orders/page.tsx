import Link from "next/link";
import { getOrders } from "@/lib/orders";
import { formatPricePKR } from "@/lib/format-price";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Orders
        </h1>
        <p className="text-muted-foreground text-sm">
          View and manage customer orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All orders</CardTitle>
          <CardDescription>
            {orders.length === 0
              ? "No orders yet."
              : `${orders.length} order${orders.length === 1 ? "" : "s"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No orders yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Customer</th>
                    <th className="p-3 font-medium">Items</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium">Payment</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3 text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          {order.firstName} {order.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.email}
                        </div>
                      </td>
                      <td className="p-3">{order.orderItems.length}</td>
                      <td className="p-3 font-medium">
                        {formatPricePKR(order.total)}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {order.shippingMethod === "cod" ? "COD" : "Bank"}
                      </td>
                      <td className="p-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/orders/${order.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
