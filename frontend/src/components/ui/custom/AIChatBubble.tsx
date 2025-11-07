import { useEffect, useState } from "react";
import { ChatBubble, type ChatMessage } from "@components/ui";
import { useSiteSettings } from "@app/hooks";
import type { ApiResponse } from "shared/interfaces";

interface AIChatBubbleProps<TArgs extends any[]> {
  title?: string;
  initialOpen?: boolean;
  className?: string;
  systemMessage?: string;
  // Generic API call: returns ApiResponse<string>
  apiCall: (
    ...args: [...TArgs, question: string, history: string]
  ) => Promise<ApiResponse<string>>;
  apiArgs?: TArgs;
  maxHistory?: number;
  aiIconUrl?: string;
}

function AIChatBubble<TArgs extends any[]>({
  title = "AI Assistant",
  initialOpen = false,
  className,
  systemMessage = "Hello! How can I help you today?",
  apiCall,
  apiArgs = [] as unknown as TArgs,
  maxHistory = 10,
  aiIconUrl,
}: AIChatBubbleProps<TArgs>) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const { siteSettings } = useSiteSettings();
  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: systemMessage, from: "ai" }]);
    }
  }, []);

  const getChatHistory = (length: number): string => {
    return messages
      .slice(-length)
      .map((msg) => `${msg.from === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { text: userInput, from: "user" }]);
    setInput("");
    setTyping(true);

    try {
      const chatHistory = getChatHistory(maxHistory);

      console.log("Sending to AI:", { apiArgs, userInput, chatHistory });
      const res = await apiCall(...apiArgs, userInput, chatHistory);
      setTyping(false);

      if (!res.success) throw new Error(res.message);

      setMessages((prev) => [...prev, { text: res.data!, from: "ai" }]);
    } catch (error) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Error connecting to AI" +
            (error instanceof Error ? `: ${error.message}` : ""),
          from: "ai",
        },
      ]);
    }
  };

  return (
    <ChatBubble
      className={className}
      open={open}
      messages={messages}
      title={title}
      inputValue={input}
      onInputChange={setInput}
      onSend={sendMessage}
      toggleOpen={toggleOpen}
      typing={typing}
      aiIconUrl={aiIconUrl || siteSettings?.siteIconURL}
    />
  );
}

export { AIChatBubble };
