"use client"

import Navbar from "@/components/navbar";
import { createTask } from "@/features/task_management/actions";
import { Task } from "@/features/task_management/types";
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

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

            <div className="md:p-20 p-10 flex flex-col gap-6 items-center justify-center">
                <div className="py-10 md:py-4 flex gap-4 flex-col items-center">
                    <h1 className="font-extrabold text-4xl text-center">Create New Task.</h1>
                    <button onClick={() => router.back()} className="py-1 px-2 bg-slate-500 rounded-lg text-white">
                        Back
                    </button>
                </div>

                <form onSubmit={handleCreateTask} className="flex flex-col items-center max-w-md min-w-xs w-full">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 rounded-lg w-full mb-4"
                        name="title"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        className="border p-2 rounded-lg w-full mb-4"
                        name="description"
                        required
                    ></textarea>

                    <input
                        type="date"
                        className="border p-2 rounded-lg w-full mb-4"
                        name="dueDate"
                    />

                    <div className="space-x-2">

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