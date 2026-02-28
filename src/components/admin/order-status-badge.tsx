import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline" | "ghost"
> = {
  pending: "outline",
  processing: "default",
  shipped: "secondary",
  delivered: "secondary",
};

export function OrderStatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const label = STATUS_LABELS[status] ?? status;
  const variant = STATUS_VARIANTS[status] ?? "outline";
  const statusClass =
    status === "shipped"
      ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
      : status === "delivered"
        ? "border-green-500/30 bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400"
        : undefined;

  return (
    <Badge variant={variant} className={cn(statusClass, className)}>
      {label}
    </Badge>
  );
}
