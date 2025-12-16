"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowDown, BrushCleaning } from "lucide-react";

import { MessageCard } from "@/features/chat/components/message_card";
import { ChatMessage } from "@/app/api/ai/route";

export default function ChatSection() {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { messages, sendMessage, status, error, stop, setMessages } =
    useChat<ChatMessage>({
      transport: new DefaultChatTransport({
        api: "/api/ai",
      }),
    });

  const startCooldown = () => {
    setIsReady(false);
    setCount(10);
  };

  useEffect(() => {
    if (count > 0) {
      timerRef.current = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setIsReady(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [count]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isReady || input.trim() === "") return;

    startCooldown();
    sendMessage({
      text: input,
    });
    setInput("");
  };

  useEffect(() => {
    if (messages.length !== 0)
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClearConversation = async () => {
    setMessages([]);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={topRef}
        className="flex flex-col justify-between items-center w-full h-[80vh] overflow-y-scroll m-4 p-4 border border-slate-400 max-w-md rounded-xl"
      >
        <div className="w-full">
          <div className="text-center text-gray-500 my-8">
            <h2 className="text-lg md:text-2xl font-semibold">
              Chat with Taskly AI
            </h2>
          </div>

          {error && (
            <div className="sticky top-18">
              <p className="text-red text-xs">
                {error?.message || "Test"}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 mb-16 w-full">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}

            {(status === "submitted" || status === "streaming") && (
              <div className="flex items-center py-2">
                <span className="loading-dots text-4xl font-bold text-primary" />
              </div>
            )}

            {messages.length !== 0 && (
              <button
                className="py-1 px-2 bg-slate-500 rounded-lg text-white"
                onClick={handleClearConversation}
              >
                Clear
              </button>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="max-w-xl bottom-16 z-30 flex flex-col items-center gap-2">
          <form
            className="bg-gray p-4 rounded-2xl shadow-lg w-full flex flex-col gap-2 items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <input
                color="primary"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {status === "submitted" || status === "streaming" ? (
                <button
                  className="py-1 px-2 bg-red-500 rounded-lg text-white"
                  onClick={stop}
                >
                  Stop
                </button>
              ) : (
                <button
                  className="py-1 px-2 bg-blue-500 rounded-lg text-white"
                  type="submit"
                >
                  Send
                </button>
              )}
            </div>

            {!isReady && (
              <p className="text-xs text-gray-600">
                Cooldown - {count} seconds
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
