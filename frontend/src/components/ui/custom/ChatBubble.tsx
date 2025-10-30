import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button, Input, XButton } from "..";

/* ---------------- Generic Chat Bubble ---------------- */
export interface ChatMessage {
  text: string;
  from: "user" | "ai";
}

interface ChatBubbleProps {
  open: boolean;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  toggleOpen: () => void;
  typing?: boolean;
  className?: string;
}

export function ChatBubble({
  open,
  messages,
  inputValue,
  onInputChange,
  onSend,
  toggleOpen,
  typing = false,
  className,
}: ChatBubbleProps) {
  // Replace messagesEndRef with container ref
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typing, open]);

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`h-96 bg-white border border-gray-200 rounded-2xl 
              flex flex-col shadow-2xl overflow-hidden ${className}`}
          >
            {/* Header */}
            <div className="bg-primary text-white px-md py-sm font-semibold flex items-center justify-between rounded-t-2xl shadow-md">
              <span className="text-lg">Chat</span>
              <XButton onClick={toggleOpen} className="text-foregroundAlt" />
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 p-md overflow-y-auto space-y-md"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.from === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: m.from === "user" ? 50 : -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex items-end ${
                    m.from === "user"
                      ? "self-end justify-end"
                      : "self-start justify-start"
                  }`}
                >
                  {/* Avatar */}
                  {m.from === "ai" && (
                    <div className="w-6 h-6 bg-gray-300 m-sm rounded-full flex-shrink-0 animate-pulse" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-2 rounded-2xl break-words shadow-sm ${
                      m.from === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                  {m.from === "user" && (
                    <div className="w-6 h-6 bg-primary rounded-full ml-2 flex-shrink-0" />
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {typing && (
                <div className="flex items-center max-w-[60%] self-start">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex-shrink-0 animate-pulse" />
                  <div className="px-3 py-2 bg-gray-100 rounded-2xl flex space-x-1">
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div />
            </div>

            {/* Input */}
            <div className="flex p-3 border-t border-gray-200 gap-md">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                placeholder="Type a message..."
              />
              <Button onClick={onSend}>Send</Button>
            </div>
          </motion.div>
        )}

        {/* Floating bubble */}
        {!open && (
          <motion.div
            className={`w-14 h-14 bg-primary text-white 
            rounded-full flex items-center justify-center 
            cursor-pointer shadow-xl z-50 transition-colors`}
            onClick={toggleOpen}
            whileHover={{ scale: 1.15 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            💬
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
