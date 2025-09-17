"use client";

import ChatShell from "@/components/chat/ChatShell";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ChatShell />
    </>
  );
}
