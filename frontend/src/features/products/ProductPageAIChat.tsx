import { useEffect, useState } from "react";
import { ChatBubble, type ChatMessage } from "@components/ui";
import type { Product } from "shared/types";
import { useApi, useSiteSettings } from "@app/hooks";

interface ProductPageAIChatProps {
  product: Product;
  initialOpen?: boolean;
  className?: string; // parent decides positioning
}

export default function ProductPageAIChat({
  product,
  initialOpen = false,
  className,
}: ProductPageAIChatProps) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const { siteSettings } = useSiteSettings();
  const { askAboutProduct } = useApi().ai;

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    messages.length === 0 &&
      setMessages([
        {
          text: `Hello! I'm here to help you with any questions about the product "${product.name}". Feel free to ask me anything!`,
          from: "ai",
        },
      ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { text: userInput, from: "user" }]);
    setInput("");
    setTyping(true);

    try {
      const res = await askAboutProduct(product, userInput);
      setTyping(false);
      if (!res.success) throw new Error(res.message);

      setMessages((prev) => [...prev, { text: res.data!, from: "ai" }]);
    } catch {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI", from: "ai" },
      ]);
    }
  };

  return (
    <ChatBubble
      className={className}
      open={open}
      messages={messages}
      title={"Product Assistant"}
      inputValue={input}
      onInputChange={setInput}
      onSend={sendMessage}
      toggleOpen={toggleOpen}
      typing={typing}
      aiIconUrl={siteSettings?.siteIconURL}
    />
  );
}
