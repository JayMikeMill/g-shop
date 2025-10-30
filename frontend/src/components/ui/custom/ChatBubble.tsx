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
  title?: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  toggleOpen: () => void;
  typing?: boolean;
  className?: string;
  userIconUrl?: string;
  aiIconUrl?: string;
}

export function ChatBubble({
  open,
  messages,
  title = "Chat",
  inputValue,
  onInputChange,
  onSend,
  toggleOpen,
  typing = false,
  className,
  userIconUrl,
  aiIconUrl,
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
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" }, // slower open
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeIn" }, // quicker close
          }}
          className={`h-96 bg-backgroundAlt border rounded-2xl 
		flex flex-col shadow-2xl overflow-hidden ${className}`}
        >
          {/* Header */}
          <div className="bg-primary text-foregroundAlt px-md py-sm font-semibold flex items-center justify-between rounded-t-2xl shadow-md">
            <span className="text-lg">{title}</span>
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
                  <div className="w-6 h-6 bg-primary p-1 rounded-full mr-2 flex-shrink-0">
                    {aiIconUrl && (
                      <img
                        src={aiIconUrl}
                        alt="AI Avatar"
                        className="w-full h-full rounded-full"
                      />
                    )}
                  </div>
                )}
                <div
                  className={`px-md py-sm rounded-2xl break-words shadow-sm ${
                    m.from === "user"
                      ? "bg-primary text-foregroundAlt"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.text}
                </div>
                {m.from === "user" && (
                  <div className="w-6 h-6 bg-primary rounded-full ml-2 flex-shrink-0" />
                )}
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center max-w-[60%] self-start">
                <div className="w-6 h-6 bg-primary rounded-full mr-2 flex-shrink-0 animate-pulse" />
                <div className="px-3 py-2 bg-primary rounded-2xl flex space-x-1">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-2 h-2 bg-foregroundAlt rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: 0.2,
                    }}
                    className="w-2 h-2 bg-foregroundAlt rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: 0.4,
                    }}
                    className="w-2 h-2 bg-foregroundAlt rounded-full"
                  />
                </div>
              </div>
            )}
            <div />
          </div>

          {/* Input */}
          <div className="flex p-3 border-t border gap-md">
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
      ) : (
        <motion.div
          key="bubble"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
        >
          <motion.div
            animate={{
              y: [0, -4, 0], // only y loops
            }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            <Button
              onClick={toggleOpen}
              variant={"bare"}
              className="w-16 h-16 bg-primary shadow-xl z-50 rounded-full p-0 m-0 text-2xl"
            >
              💬
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
