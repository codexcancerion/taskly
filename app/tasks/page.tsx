

import Navbar from "@/components/navbar"
import { getAllTasks } from "@/features/task_management/actions"
import TaskCard from "@/features/task_management/components/task_card"

export default async function Page() {
    const tasks = await getAllTasks()

    return (
        <div className="">
            <Navbar />

            <div className="p-20 flex flex-col gap-6 items-center justify-center">
                <h1 className="font-extrabold text-4xl">Your Tasks.</h1>
                <a href="/tasks/create" className="py-1 px-2 bg-blue-500 rounded-lg text-white">
                    Create New Task
                </a>

                <div className="flex gap-4 flex-wrap">
                    {tasks.map((task) => {
                        return (
                            <TaskCard key={task.id} task={task} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}