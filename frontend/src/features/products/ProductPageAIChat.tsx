import { useState } from "react";
import { ChatBubble, type ChatMessage } from "@components/ui";
import type { Product } from "shared/types";
import { useApi } from "@app/hooks";

interface ProductPageAIChatProps {
  product: Product;
  className?: string; // parent decides positioning
}

export default function ProductPageAIChat({
  className,
  product,
}: ProductPageAIChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const { askAboutProduct } = useApi().ai;

  const toggleOpen = () => setOpen((prev) => !prev);

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
    <div className={className}>
      <ChatBubble
        className={className}
        open={open}
        messages={messages}
        inputValue={input}
        onInputChange={setInput}
        onSend={sendMessage}
        toggleOpen={toggleOpen}
        typing={typing}
      />
    </div>
  );
}
