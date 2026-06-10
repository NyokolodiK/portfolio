"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Navigation } from "lucide-react";
import ChatMessage from "./ChatMessage";

export default function MessagesList({
  messages,
  isLoading,
  dynamicSuggestions,
  fallbackPrompts,
  pendingNavigation,
  onNavigate,
  onCancelNavigation,
  onPromptClick,
}) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const showInitialPrompts = messages.length === 1;
  const showDynamicSuggestions = !isLoading && dynamicSuggestions && dynamicSuggestions.length > 0 && messages.length > 1;
  const currentSuggestions = dynamicSuggestions && dynamicSuggestions.length > 0 ? dynamicSuggestions : fallbackPrompts;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.content}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}

      {/* Initial static suggested prompts */}
      {showInitialPrompts && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-xs text-white/60 font-semibold flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Suggested questions:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {currentSuggestions.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onPromptClick(prompt)}
                className="text-left text-sm bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 px-3 py-2 rounded-lg text-white/80 hover:text-white transition-all"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Co-navigation banner */}
      <AnimatePresence>
        {pendingNavigation && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-3 bg-accent/15 border border-accent/30 rounded-lg px-3 py-2"
          >
            <Navigation className="h-4 w-4 text-accent flex-shrink-0" />
            <p className="text-xs text-white/80 flex-1">
              Would you like to visit the <span className="text-accent font-semibold capitalize">{pendingNavigation.label}</span> page?
            </p>
            <button
              onClick={onNavigate}
              className="text-xs bg-accent hover:bg-accent-hover text-primary font-semibold px-3 py-1 rounded-md transition-colors"
            >
              Go
            </button>
            <button
              onClick={onCancelNavigation}
              className="text-xs text-white/40 hover:text-white/70"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic contextual suggestions after AI reply */}
      <AnimatePresence>
        {showDynamicSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <p className="text-xs text-white/50 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> You might also ask:
            </p>
            <div className="flex flex-wrap gap-2">
              {dynamicSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => onPromptClick(suggestion)}
                  className="text-xs bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 px-3 py-1.5 rounded-full text-white/75 hover:text-white transition-all"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2 items-center ml-12 bg-accent/10 px-4 py-3 rounded-2xl rounded-tl-none w-fit"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 bg-accent rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="w-2 h-2 bg-accent rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="w-2 h-2 bg-accent rounded-full"
            />
            <span className="text-xs text-white/60 ml-2">AI is thinking...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );
}
