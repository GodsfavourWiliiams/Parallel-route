"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  getNextStepPath,
  getStepIndexByPathname,
  getStepLabelByIndex,
  getStepLabelByPath,
  orderedSteps,
} from "@/lib/steps";

export default function ChatShell() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Navigation-only modal; no local chat state

  // If opened first via /chat without a step-known pathname, try infer from ?from
  const fromParam = searchParams.get("from");

  // Determine the effective path representing the current step
  const effectivePath = useMemo(() => {
    const isStepPath = orderedSteps.includes(pathname as any);
    if (isStepPath) return pathname as string;
    if (fromParam && orderedSteps.includes(fromParam as any)) return fromParam;
    return null;
  }, [pathname, fromParam]);

  const currentIndex = getStepIndexByPathname(effectivePath);
  const currentLabel = getStepLabelByPath(effectivePath ?? pathname);
  const nextPath = getNextStepPath(effectivePath ?? pathname);

  const headerTitle = useMemo(() => {
    if (currentIndex >= 0) return `You are currently viewing ${currentLabel}`;
    if (fromParam) {
      const label = getStepLabelByPath(fromParam);
      if (label !== "Unknown") return `You are currently viewing ${label}`;
    }
    return "Chat";
  }, [currentIndex, currentLabel, fromParam]);

  useEffect(() => {
    // No-op: modal persists across route changes
  }, [pathname]);

  function handleClose() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={(v) => (!v ? handleClose() : undefined)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {headerTitle}
          </DialogTitle>
          <DialogDescription>Use the buttons to navigate steps.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {orderedSteps.map((href) => (
              <Button
                key={href}
                variant={href === effectivePath ? "default" : "secondary"}
                onClick={() => {
                  router.push(href);
                }}
              >
                {getStepLabelByPath(href)}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
