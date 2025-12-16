import { tool } from "ai";
import z from "zod";
import { createTask, getAllTasks } from "../actions";

const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    isCompleted: z.boolean(),
    dueDate: z.string().optional(),
    dateCreated: z.string(),
    dateCompleted: z.string().optional(),
});


export const tools = {
  createTask: tool({
    description: "create a new task in the task management system",
    inputSchema: z.object({
        task: TaskSchema
    }),
    execute: async ({ task }) => {
        await createTask(task);
        return task;
    },
  }),
  getAllTasks: tool({
    description: "retrieve all tasks from the task management system",
    inputSchema: z.object({}),
    execute: async () => {
        const tasks = await getAllTasks();
        return tasks;
    },
  }),
  generateUniqueId: tool({
    description: "Generate a unique id",
    inputSchema: z.object({}),
    execute: async () => {
      const id = crypto.randomUUID();

      return { output: id };
    },
  }),
}