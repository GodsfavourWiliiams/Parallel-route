"use client";

import { Suspense } from "react";
import ChatShell from "@/components/chat/ChatShell";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ChatShell />
      </Suspense>
    </>
  );
}
