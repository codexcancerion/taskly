"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import TaskCard from "@/features/task_management/components/task_card"
import { Task } from "@/features/task_management/types"
import { getAllTasks } from "@/features/task_management/actions"

export default function Page() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getAllTasks()
            setTasks(data)
        }
        fetchTasks()
    }, [])

    return (
        <div className="">
            <Navbar />

            <div className="md:p-20 p-4 flex flex-col gap-6 items-center justify-center">
                <div className="py-10 md:py-4 flex gap-4 flex-col items-center">
                    <h1 className="font-extrabold text-4xl text-center">Your Tasks.</h1>
                    <a href="/tasks/create" className="py-1 px-2 bg-blue-500 rounded-lg text-white">
                        Create New Task
                    </a>
                </div>

                {<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
                }
            </div>
        </div>
    )
}