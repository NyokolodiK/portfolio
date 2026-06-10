import { useState, useEffect, useCallback } from "react";

export type ChatMessage = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

export type PendingNavigation = {
  path: string;
  label: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  content: "Hi there! 👋 I'm Kagiso's AI assistant. How can I help you today?",
  isUser: false,
  timestamp: new Date(),
};

const METADATA_REGEX = /\[METADATA:\s*(\{[\s\S]*?\})\s*\]\s*$/m;

export function parseAIResponse(raw) {
  const match = raw.match(METADATA_REGEX);
  if (!match) return { cleanContent: raw.trim(), metadata: null };

  try {
    const metadata = JSON.parse(match[1]);
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata };
  } catch {
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata: null };
  }
}

function serializeMessages(messages) {
  return JSON.stringify(messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })));
}

function deserializeMessages(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [INITIAL_MESSAGE];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [pendingNavigation, setPendingNavigation] = useState<PendingNavigation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chat-messages");
    if (savedMessages) {
      const restored = deserializeMessages(savedMessages);
      if (restored.length > 0) setMessages(restored);
    }

    const savedHistory = localStorage.getItem("chat-history");
    if (savedHistory) {
      try {
        setConversationHistory(JSON.parse(savedHistory));
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  // Save messages to sessionStorage on change
  useEffect(() => {
    if (messages.length > 1) {
      sessionStorage.setItem("chat-messages", serializeMessages(messages));
    }
  }, [messages]);

  const saveToHistory = useCallback((userMessage) => {
    setConversationHistory((prev) => {
      const updated = [...prev, userMessage].slice(-10);
      localStorage.setItem("chat-history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const sendMessage = useCallback(
    async (message) => {
      const userMessage = {
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
        // Build API messages stripping metadata from past assistant messages
        const apiMessages = [...messages, userMessage].map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.isUser ? msg.content : parseAIResponse(msg.content).cleanContent,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();

        if (data.message?.content) {
          const { cleanContent, metadata } = parseAIResponse(data.message.content);

          setMessages((prev) => [
            ...prev,
            { content: cleanContent, isUser: false, timestamp: new Date() },
          ]);

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

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setDynamicSuggestions([]);
    setPendingNavigation(null);
    sessionStorage.removeItem("chat-messages");
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    localStorage.removeItem("chat-history");
  }, []);

  return {
    messages,
    conversationHistory,
    dynamicSuggestions,
    pendingNavigation,
    setPendingNavigation,
    isLoading,
    sendMessage,
    clearChat,
    clearHistory,
  };
}
