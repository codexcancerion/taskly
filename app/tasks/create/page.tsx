"use client"

import Navbar from "@/components/navbar";
import { createTask, getTaskById } from "@/features/task_management/actions";
import { Task } from "@/features/task_management/types";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
    const id = useParams().id as string;
    const router = useRouter()
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const fetchTask = async () => {
            const fetchedTask = await getTaskById(id);
            if (fetchedTask) setTask(fetchedTask);
        }
        fetchTask();
    }, [id]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dueDate = formData.get("dueDate") as string;

        const newTask: Task = {
            id: crypto.randomUUID(),
            isCompleted: false,
            title,
            description,
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            dateCreated: new Date().toISOString(),
        };

        await createTask(newTask);
        router.push("/tasks");
    }


    return (
        <div className="">
            <Navbar />

            <div className="p-20 flex flex-col gap-6 items-center">
                <h1 className="font-extrabold text-4xl">Create New Task.</h1>

                <form onSubmit={handleCreateTask} className="flex flex-col items-center max-w-md min-w-xs w-full">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 rounded-lg w-full mb-4"
                        defaultValue={task?.title}
                        name="title"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        className="border p-2 rounded-lg w-full mb-4"
                        defaultValue={task?.description}
                        name="description"
                        required
                    ></textarea>

                    <input
                        type="date"
                        className="border p-2 rounded-lg w-full mb-4"
                        defaultValue={task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                        name="dueDate"
                    />

                    <div className="space-x-2">
                        <button onClick={() => router.back()} className="py-1 px-2 bg-slate-500 rounded-lg text-white">
                            Back
                        </button>

                        <button
                            type="submit"
                            className="py-1 px-2 bg-blue-500 rounded-lg text-white"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}