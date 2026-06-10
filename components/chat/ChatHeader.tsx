"use client";

import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { Maximize2, Minimize2, Sparkles, History } from "lucide-react";

export default function ChatHeader({
  isFullScreen,
  onToggleFullScreen,
  showHistory,
  onToggleHistory,
  onClearChat,
  hasHistory,
}) {
  return (
    <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-4 border-b border-accent/20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Portfolio AI Assistant</h3>
          <p className="text-xs text-white/60">Always here to help</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={onClearChat}
          className="w-8 h-8 p-0"
          title="Clear Chat"
        >
          <IoMdClose className="h-4 w-4" />
        </Button>
        {hasHistory && (
          <Button
            variant="outlined"
            size="sm"
            onClick={onToggleHistory}
            className="w-8 h-8 p-0"
            title="Conversation History"
          >
            <History className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outlined"
          size="sm"
          onClick={onToggleFullScreen}
          className="w-8 h-8 p-0"
          title={isFullScreen ? "Minimize" : "Fullscreen"}
        >
          {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
