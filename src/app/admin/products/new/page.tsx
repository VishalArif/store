import { AddProductForm } from "@/components/admin/add-product-form";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Add product
        </h1>
        <p className="text-muted-foreground text-sm">
          Create a new product and set pricing, media, and visibility.
        </p>
      </div>
      <AddProductForm />
    </div>
  );
}
