"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboardIcon,
  PackagePlusIcon,
  StoreIcon,
  ImageIcon,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products/new", label: "Add product", icon: PackagePlusIcon },
  { href: "/admin/slides", label: "Hero slides", icon: ImageIcon },
  { href: "/", label: "Store", icon: StoreIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        "hidden md:flex"
      )}
    >
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4">
        <span className="font-semibold">Admin</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? false
              : pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
