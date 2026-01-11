import { useState, useCallback } from "react";

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function useChat(initialMessage?: Message) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessage ? [initialMessage] : []
  );
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string): Promise<void> => {
    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((msg) => ({
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
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages(initialMessage ? [initialMessage] : []);
  }, [initialMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
