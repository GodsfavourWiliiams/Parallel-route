"use client";

import { useEffect, useMemo } from "react";
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
  getStepIndexByPathname,
  getStepLabelByPath,
  orderedSteps,
  StepPath,
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
    const isStepPath = orderedSteps.includes(pathname as StepPath);
    if (isStepPath) return pathname as string;
    if (fromParam && orderedSteps.includes(fromParam as StepPath)) return fromParam as StepPath;
    return null as StepPath | null;
  }, [pathname, fromParam]);

  const currentIndex = getStepIndexByPathname(effectivePath);
  const currentLabel = getStepLabelByPath(effectivePath ?? pathname as StepPath);

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
    // When on an intercepted route like /chat, we want to close the modal
    // but remain on the current step. If the path is one of the step routes,
    // do nothing (modal will deactivate if we're not at /chat). If we're at
    // /chat (intercept), push to the effective step path instead of history back.
    const isOnChat = pathname === "/chat";
    const target = effectivePath ?? "/step-one";
    if (isOnChat) {
      router.push(target);
    } else {
      // If already on a step path, closing should keep you there; do nothing.
      // But Dialog onOpenChange expects a state change; so we emulate it by navigating to same route.
      router.push(target);
    }
  }

  // Open the modal when at /chat, or if a ?modal=1 param is present
  const modalParam = searchParams.get("modal");
  const shouldOpen = pathname === "/chat" || modalParam === "1";

  return (
    <Dialog open={shouldOpen} onOpenChange={(v) => (!v ? handleClose() : undefined)}>
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
                  const url = new URL(href, window.location.origin);
                  url.searchParams.set("modal", "1");
                  router.push(url.pathname + url.search);
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
