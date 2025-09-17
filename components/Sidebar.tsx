"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/step-one", label: "Step 1" },
  { href: "/step-two", label: "Step 2" },
  { href: "/step-three", label: "Step 3" },
  { href: "/step-four", label: "Step 4" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen sticky top-0 p-6 flex flex-col gap-6">
      <div className="text-xl font-semibold">Parallel Routes Demo</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/chat?from=${encodeURIComponent(pathname ?? "/")}`}>
            Open Chat
          </Link>
        </Button>
      </div>
    </div>
  );
}
