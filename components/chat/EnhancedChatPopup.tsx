"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Maximize2, Minimize2, Sparkles, History, Navigation } from "lucide-react";

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type ChatMetadata = {
  action?: { type: "navigate"; path: string } | null;
  suggestions?: string[];
};

const INITIAL_MESSAGE: Message = {
  content: "Hi there! 👋 I'm Kagiso's AI assistant. How can I help you today?",
  isUser: false,
  timestamp: new Date(),
};

const FALLBACK_PROMPTS = [
  "Tell me about Kagiso's React experience",
  "What projects has Kagiso worked on?",
  "What are Kagiso's key technical skills?",
  "Tell me about Kagiso's work at NTT",
  "How can I contact Kagiso?",
  "What makes Kagiso stand out as a developer?",
];

const METADATA_REGEX = /\[METADATA:\s*(\{[\s\S]*?\})\s*\]\s*$/m;

function parseMetadata(raw: string): { cleanContent: string; metadata: ChatMetadata | null } {
  const match = raw.match(METADATA_REGEX);
  if (!match) return { cleanContent: raw.trim(), metadata: null };

  try {
    const metadata: ChatMetadata = JSON.parse(match[1]);
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata };
  } catch {
    // If JSON parse fails, strip the block safely and continue
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata: null };
  }
}

function serializeMessages(messages: Message[]): string {
  return JSON.stringify(messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })));
}

function deserializeMessages(raw: string): Message[] {
  try {
    const parsed = JSON.parse(raw);
    return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [INITIAL_MESSAGE];
  }
}

export default function EnhancedChatPopup() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [pendingNavigation, setPendingNavigation] = useState<{ path: string; label: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Persistence: restore chat from sessionStorage on mount ---
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chat-messages");
    if (savedMessages) {
      const restored = deserializeMessages(savedMessages);
      if (restored.length > 0) setMessages(restored);
    }

    const savedHistory = localStorage.getItem("chat-history");
    if (savedHistory) {
      try { setConversationHistory(JSON.parse(savedHistory)); } catch { /* ignore */ }
    }
  }, []);

  // --- Persistence: save chat to sessionStorage on every update ---
  useEffect(() => {
    if (messages.length > 1) {
      sessionStorage.setItem("chat-messages", serializeMessages(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const saveToHistory = useCallback(
    (userMessage: string) => {
      const updated = [...conversationHistory, userMessage].slice(-10);
      setConversationHistory(updated);
      localStorage.setItem("chat-history", JSON.stringify(updated));
    },
    [conversationHistory]
  );

  const handleSendMessage = useCallback(
    async (message: string) => {
      const userMessage: Message = {
        content: message,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setPendingNavigation(null);
      setDynamicSuggestions([]);
      saveToHistory(message);

      try {
        const allMessages = [...messages, userMessage];
        const apiMessages = allMessages.map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          // Strip metadata from assistant messages before sending back to API
          content: msg.isUser ? msg.content : parseMetadata(msg.content).cleanContent,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();

        if (data.message?.content) {
          const rawContent: string = data.message.content;
          const { cleanContent, metadata } = parseMetadata(rawContent);

          // Add the clean message (without the metadata block) to the chat
          setMessages((prev) => [
            ...prev,
            { content: cleanContent, isUser: false, timestamp: new Date() },
          ]);

          // Handle metadata
          if (metadata) {
            if (metadata.suggestions && metadata.suggestions.length > 0) {
              setDynamicSuggestions(metadata.suggestions);
            }
            if (metadata.action?.type === "navigate" && metadata.action.path) {
              const path = metadata.action.path;
              const pageLabel = path.replace("/", "").replace(/-/g, " ") || "home";
              setPendingNavigation({ path, label: pageLabel });
            }
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            content: "Sorry, I'm having trouble connecting right now. Please try again later.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, saveToHistory]
  );

  const handlePromptClick = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  const handleNavigate = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation.path);
      setIsOpen(false);
      setPendingNavigation(null);
    }
  };

  const clearHistory = () => {
    setConversationHistory([]);
    localStorage.removeItem("chat-history");
    setShowHistory(false);
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setDynamicSuggestions([]);
    setPendingNavigation(null);
    sessionStorage.removeItem("chat-messages");
  };

  const currentSuggestions = dynamicSuggestions.length > 0 ? dynamicSuggestions : FALLBACK_PROMPTS;
  const showInitialPrompts = messages.length === 1;
  const showDynamicSuggestions = !isLoading && dynamicSuggestions.length > 0 && messages.length > 1;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-accent hover:bg-accent-hover text-primary shadow-lg p-0 relative"
        size="sm"
      >
        {isOpen ? (
          <IoMdClose className="h-7 w-7" />
        ) : (
          <>
            <IoChatbubbleEllipsesOutline className="h-7 w-7" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-primary"></span>
          </>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`${
              isFullScreen
                ? "fixed inset-4 w-auto h-auto z-[100]"
                : "absolute bottom-20 right-0 w-96 sm:w-[28rem] h-[36rem]"
            } bg-primary/95 backdrop-blur-xl border border-accent/20 rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all`}
          >
            {/* Header */}
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
                  onClick={clearChat}
                  className="w-8 h-8 p-0"
                  title="Clear Chat"
                >
                  <IoMdClose className="h-4 w-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-8 h-8 p-0"
                  title="Conversation History"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="w-8 h-8 p-0"
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Recent Questions History */}
            <AnimatePresence>
              {showHistory && conversationHistory.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-accent/5 border-b border-accent/20 overflow-hidden"
                >
                  <div className="p-3 max-h-32 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/60 font-semibold">Recent Questions</p>
                      <button onClick={clearHistory} className="text-xs text-accent hover:text-accent-hover">
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {conversationHistory.slice(-5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(item)}
                          className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white/80 transition-colors"
                        >
                          {item.length > 30 ? `${item.substring(0, 30)}...` : item}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
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
                        onClick={() => handlePromptClick(prompt)}
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
                      onClick={handleNavigate}
                      className="text-xs bg-accent hover:bg-accent-hover text-primary font-semibold px-3 py-1 rounded-md transition-colors"
                    >
                      Go
                    </button>
                    <button
                      onClick={() => setPendingNavigation(null)}
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
                          onClick={() => handlePromptClick(suggestion)}
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

            {/* Input */}
            <div className="p-4 border-t border-accent/20 bg-primary/50">
              <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
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
