"use client";
/* eslint-disable */

import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ToolCard } from "./tool_card";

interface MessageCardProps {
  message: any;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {

  return (
    <div className={`w-full flex ${message.role === "user" && "justify-end"}`}>
        <div
          className={`rounded-lg p-4 max-w-md min-w-40 bg-slate-900 text-slate-100 ${
            message.role === "user"
              ? ""
              : "self-start"
          }`}
        >
          <div className="font-semibold mb-1">
            {message.role === "user" ? "You" : "Taskly AI"}
          </div>

          {message.parts.map((part: any, index: number) => {
            if (part.type === "text") {
              return (
                <div
                  key={`${message.id}-${index}`}
                  className="prose dark:text-white"
                >
                  <Markdown rehypePlugins={[rehypeRaw]}>{part.text}</Markdown>
                </div>
              );
            }

            if (part.type.startsWith("tool-")) {
              return (
                <ToolCard
                  key={`${message.id}-${index}`}
                  errorText={part.errorText}
                  input={part.input}
                  output={part.output}
                  state={part.state}
                  type={part.type}
                />
              );
            }

            return null;
          })}
        </div>
    </div>
  );
};
