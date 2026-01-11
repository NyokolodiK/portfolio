"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Maximize2, Minimize2, Sparkles, History, X } from "lucide-react";

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  "Tell me about Kagiso's React experience",
  "What projects has Kagiso worked on?",
  "What are Kagiso's key technical skills?",
  "Tell me about Kagiso's work at NTT",
  "How can I contact Kagiso?",
  "What makes Kagiso stand out as a developer?",
];

export default function EnhancedChatPopup() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! 👋 I'm Kagiso's AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem("chat-history");
    if (saved) {
      setConversationHistory(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (userMessage: string) => {
    const updated = [...conversationHistory, userMessage].slice(-10);
    setConversationHistory(updated);
    localStorage.setItem("chat-history", JSON.stringify(updated));
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    saveToHistory(message);

    try {
      const apiMessages = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.message && data.message.content) {
        setMessages((prev) => [
          ...prev,
          {
            content: data.message.content,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
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
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearHistory = () => {
    setConversationHistory([]);
    localStorage.removeItem("chat-history");
    setShowHistory(false);
  };

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
                  {isFullScreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

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
                      <button
                        onClick={clearHistory}
                        className="text-xs text-accent hover:text-accent-hover"
                      >
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

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}

              {messages.length === 1 && (
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
                    {SUGGESTED_PROMPTS.map((prompt, index) => (
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
                    ></motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-2 h-2 bg-accent rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-2 h-2 bg-accent rounded-full"
                    ></motion.div>
                    <span className="text-xs text-white/60 ml-2">AI is thinking...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-accent/20 bg-primary/50">
              <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
              <p className="text-xs text-white/40 text-center mt-2">
                Powered by AI • Always learning about Kagiso
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
