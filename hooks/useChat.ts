import { useState, useCallback } from "react";

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatMetadata {
  action?: { type: "navigate"; path: string } | null;
  suggestions?: string[];
}

export interface ParsedResponse {
  cleanContent: string;
  metadata: ChatMetadata | null;
}

const METADATA_REGEX = /\[METADATA:\s*(\{[\s\S]*?\})\s*\]\s*$/m;

/**
 * Strips the [METADATA: {...}] block from the end of an AI response
 * and returns both the clean content and parsed metadata.
 */
export function parseAIResponse(raw: string): ParsedResponse {
  const match = raw.match(METADATA_REGEX);
  if (!match) return { cleanContent: raw.trim(), metadata: null };

  try {
    const metadata: ChatMetadata = JSON.parse(match[1]);
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata };
  } catch {
    const cleanContent = raw.replace(METADATA_REGEX, "").trim();
    return { cleanContent, metadata: null };
  }
}

export function useChat(initialMessage?: Message) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessage ? [initialMessage] : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lastMetadata, setLastMetadata] = useState<ChatMetadata | null>(null);

  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      const userMessage: Message = {
        content: message,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setLastMetadata(null);

      try {
        // Build API messages stripping metadata from any past assistant messages
        const apiMessages = [...messages, userMessage].map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.isUser ? msg.content : parseAIResponse(msg.content).cleanContent,
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

        if (data.message?.content) {
          const { cleanContent, metadata } = parseAIResponse(data.message.content);

          setMessages((prev) => [
            ...prev,
            {
              content: cleanContent,
              isUser: false,
              timestamp: new Date(),
            },
          ]);

          if (metadata) {
            setLastMetadata(metadata);
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            content:
              "Sorry, I'm having trouble connecting right now. Please try again later.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages(initialMessage ? [initialMessage] : []);
    setLastMetadata(null);
  }, [initialMessage]);

  return {
    messages,
    isLoading,
    lastMetadata,
    sendMessage,
    clearMessages,
    parseAIResponse,
  };
}
