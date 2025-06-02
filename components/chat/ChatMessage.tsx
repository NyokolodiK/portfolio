"use client";

import { cn, formattedTime } from "@/lib/utils";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatMessage({
  message,
  isUser,
  timestamp,
}: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary text-sm font-semibold">
            You
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary border border-accent flex items-center justify-center text-white text-sm">
            AI
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-2xl",
            isUser
              ? "bg-accent text-primary rounded-tr-none"
              : "bg-white/10 text-white rounded-tl-none"
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          ) : (
            <AnimatedText text={message} className="text-sm whitespace-pre-wrap block" />
          )}
        </div>
        <span className="text-xs text-white/60 mt-1">{formattedTime(timestamp)}</span>
      </div>
    </motion.div>
  );
}
