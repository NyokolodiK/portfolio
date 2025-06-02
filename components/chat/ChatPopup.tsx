"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatPopup() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm Kagiso's AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare messages for API in the correct format (compatible with both OpenAI and Gemini)
      const apiMessages = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.content,
        }));

      // Send to our API endpoint
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

      // Add AI response to chat
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
      // Add error message
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-accent hover:bg-accent-hover text-primary shadow-lg p-0"
        size="sm"
      >
        {isOpen ? (
          <IoMdClose className="h-6 w-6" />
        ) : (
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-primary border border-white/10 rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-accent/10 p-3 border-b border-white/10">
              <h3 className="text-white font-medium flex items-center gap-2">
                <IoChatbubbleEllipsesOutline className="h-4 w-4" />
                Portfolio AI Assistant
              </h3>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-2 items-center ml-12 bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none w-fit"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/10">
              <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
