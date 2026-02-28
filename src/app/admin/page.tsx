import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { formatPricePKR } from "@/lib/format-price";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Products
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your store products. View, add, or remove items.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
          <div>
            <CardTitle>All products</CardTitle>
            <CardDescription>
              {products.length === 0
                ? "No products yet. Add one to get started."
                : `${products.length} product${products.length === 1 ? "" : "s"}`}
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">Add product</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No products yet. Add one to get started.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Slug</th>
                    <th className="p-3 font-medium">Price</th>
                    <th className="p-3 font-medium">Featured</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3 text-muted-foreground">{p.slug}</td>
                      <td className="p-3">{formatPricePKR(p.price)}</td>
                      <td className="p-3">{p.featured ? "Yes" : "—"}</td>
                      <td className="p-3 flex items-center gap-3">
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </Link>
                        <DeleteProductButton productId={p.id} productName={p.name} />
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
