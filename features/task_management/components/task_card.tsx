"use client";

import { useRouter } from "next/navigation";
import { Task } from "../types";
import { deleteTask, updateTask } from "../actions";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const router = useRouter()

    const handleMarkAsComplete = async () => {
        const updatedTask = {
            isCompleted: true,
        };

        await updateTask(task.id, updatedTask);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }

    const handleUpdate = () => {
        router.push("/tasks/" + task.id);
    }

    const handleDelete = async () => {
        await deleteTask(task.id);
        console.log("Deleted task with ID:", task.id);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }

    return (
        <div className="bg-slate-100 p-4 w-full max-w-md rounded-xl flex flex-col justify-between gap-4">
            <div>
                <h2 className="text-xl font-semibold text-slate-800">{task.title}</h2>

                {task.description &&
                    <p className="text-sm text-slate-600">{task.description}</p>
                }

                <p className="font-bold text-slate-700">{task.isCompleted ? "Completed" : "Pending"}</p>

                {task.dueDate &&
                    <p className="text-sm text-slate-700">Due on {new Date(task.dueDate).toLocaleDateString()}</p>
                }
            </div>

            <div className="flex gap-2">
                {!task.isCompleted &&
                    <>
                        <button onClick={handleMarkAsComplete} className="py-1 px-2 bg-blue-500 rounded-lg text-white">
                            Mark as Complete
                        </button>

                        <button onClick={handleUpdate} className="py-1 px-2 bg-slate-500 rounded-lg text-white">
                            Update
                        </button>
                    </>
                }

                <button onClick={handleDelete} className="py-1 px-2 bg-red-500 rounded-lg text-white">
                    Delete
                </button>
            </div>
        </div>
    )
}