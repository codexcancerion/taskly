"use server"

import { tasks } from "./data";
import { Task } from "./types";

const createTask = async (task: Task) => {
    // Logic to create a new task
    tasks.push(task);

    console.log("Task created:", task);
}

const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    // Logic to update an existing task

    console.log(`Task ${taskId} updated with`, updatedTask);
}

const deleteTask = async (taskId: string) => {
    // Logic to delete a task
}

const getTaskById = async (taskId: string): Promise<Task | null> => {
    // Logic to retrieve a task by its ID
    const task = tasks.find(t => t.id === taskId);
    return task || null;
}

const getAllTasks = async (): Promise<Task[]> => {
    // Logic to retrieve all tasks
    return tasks;
}

export {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getAllTasks,
};