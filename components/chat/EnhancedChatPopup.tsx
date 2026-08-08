"use client";

import ChatHeader from "./ChatHeader";
import HistoryPanel from "./HistoryPanel";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";
import ChatTrigger from "./ChatTrigger";
import { useChat } from "@/hooks/useChat";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FALLBACK_PROMPTS = [
  "Tell me about Kagiso's React experience",
  "What projects has Kagiso worked on?",
  "What are Kagiso's key technical skills?",
  "Tell me about Kagiso's work at NTT",
  "How can I contact Kagiso?",
  "What makes Kagiso stand out as a developer?",
];

export default function EnhancedChatPopup() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const {
    messages,
    conversationHistory,
    dynamicSuggestions,
    pendingNavigation,
    setPendingNavigation,
    isLoading,
    sendMessage,
    clearChat,
    clearHistory,
  } = useChat();

  const handleNavigate = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation.path);
      setIsOpen(false);
      setPendingNavigation(null);
    }
  };

  const handleCancelNavigation = () => {
    setPendingNavigation(null);
  };

  const handleToggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`${
              isFullScreen
                ? "fixed inset-4 z-[100]"
                : "fixed bottom-20 right-4 sm:right-0 w-[95vw] max-w-md sm:w-[28rem] h-[70vh] sm:h-[36rem] z-[60]"
            } bg-primary/95 backdrop-blur-xl border border-accent/20 rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all`}
          >
            <ChatHeader
              isFullScreen={isFullScreen}
              onToggleFullScreen={handleToggleFullScreen}
              showHistory={showHistory}
              onToggleHistory={handleToggleHistory}
              onClearChat={clearChat}
              hasHistory={conversationHistory.length > 0}
            />

            <AnimatePresence>
              {showHistory && (
                <HistoryPanel
                  history={conversationHistory}
                  onClearHistory={clearHistory}
                  onPromptClick={sendMessage}
                />
              )}
            </AnimatePresence>

            <MessagesList
              messages={messages}
              isLoading={isLoading}
              dynamicSuggestions={dynamicSuggestions}
              fallbackPrompts={FALLBACK_PROMPTS}
              pendingNavigation={pendingNavigation}
              onNavigate={handleNavigate}
              onCancelNavigation={handleCancelNavigation}
              onPromptClick={sendMessage}
            />

            <div className="p-4 border-t border-accent/20 bg-primary/50">
              <ChatInput onSubmit={sendMessage} isLoading={isLoading} />
              <p className="text-xs text-white/40 text-center mt-2">
                Powered by Gemini AI • Live portfolio data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
