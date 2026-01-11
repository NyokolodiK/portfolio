"use client";

import dynamic from "next/dynamic";

const EnhancedChatPopup = dynamic(() => import("./EnhancedChatPopup"), { ssr: false });

export default function ChatWrapper() {
  return <EnhancedChatPopup />;
}
