import {
  UIMessage,
  UIDataTypes,
  streamText,
  convertToModelMessages,
  stepCountIs,
  InferUITools,
} from "ai";
import { google } from "@ai-sdk/google";

import { tools } from "@/features/task_management/ai/tools";

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { messages }: { messages: ChatMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: [
      {
        role: "system",
        content:
          "You are a friendly, bright and helpful assistant in managing tasks of the user. You can create and summarize tasks." +
            "Sometimes users chat in Ilokano language, detect then adapt accordingly." +
            "Make the interactions engaging and conversational." +
            "If you are creating a task, generate a unique id using the tool provided." +
            "For summarizing tasks, focus on pending tasks.",
      },
      ...convertToModelMessages(messages),
    ],
    tools,
    stopWhen: stepCountIs(4),
  });

  return result.toUIMessageStreamResponse();
}
