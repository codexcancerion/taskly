"use server"

import { addDocument, deleteDocument, getAllDocuments, getDocumentById, updateDocument } from "@/services/firebase/utils";
import { Task } from "./types";
import { TASKS_COLLECTION } from "@/services/firebase/config";

const createTask = async (task: Task) => {
    // Logic to create a new task
    await addDocument(TASKS_COLLECTION, task, task.id);
}

const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    // Logic to update an existing task
    await updateDocument(TASKS_COLLECTION, taskId, updatedTask);
}

const deleteTask = async (taskId: string) => {
    // Logic to delete a task
    await deleteDocument(TASKS_COLLECTION, taskId);
}

const getTaskById = async (taskId: string): Promise<Task | null> => {
    // Logic to retrieve a task by its ID
    const task = await getDocumentById<Task>(TASKS_COLLECTION, taskId);
    return task || null;
}

const getAllTasks = async (): Promise<Task[]> => {
    // Logic to retrieve all tasks
    const tasks = await getAllDocuments<Task>(TASKS_COLLECTION);
    return tasks;
}

export {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getAllTasks,
};