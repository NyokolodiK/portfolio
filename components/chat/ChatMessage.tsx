"use client";

import { cn, formattedTime } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp: Date;
};

function ChatMessage({
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
            <div className="text-sm prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => (
                    <a 
                      {...props} 
                      className="text-accent hover:text-accent-hover underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    />
                  ),
                  code: ({ ...props }) => (
                    <code {...props} className="bg-black/30 px-1 py-0.5 rounded text-accent" />
                  ),
                  ul: ({ ...props }) => (
                    <ul {...props} className="list-disc list-inside my-2" />
                  ),
                  ol: ({ ...props }) => (
                    <ol {...props} className="list-decimal list-inside my-2" />
                  ),
                  p: ({ ...props }) => (
                    <p {...props} className="my-2" />
                  ),
                  strong: ({ ...props }) => (
                    <strong {...props} className="font-bold text-accent" />
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-xs text-white/60 mt-1">{formattedTime(timestamp)}</span>
      </div>
    </motion.div>
  );
}

export default memo(ChatMessage);
