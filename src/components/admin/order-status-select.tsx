"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

const ALLOWED_STATUSES = ["pending", "processing", "shipped", "delivered"];

export function OrderStatusSelect({
  orderId,
  currentStatus,
  className,
}: {
  orderId: string;
  currentStatus: string;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    startTransition(async () => {
      const result = await updateOrderStatusAction(orderId, value);
      if (!result.error) router.refresh();
    });
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Status</Label>
      <Select
        value={currentStatus}
        onValueChange={handleChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-full max-w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {ALLOWED_STATUSES.map((value) => (
            <SelectItem key={value} value={value}>
              {STATUS_LABELS[value] ?? value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && (
        <p className="text-xs text-muted-foreground">Updating…</p>
      )}
    </div>
  );
}
