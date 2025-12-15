import { Task } from "./types";


export const tasks: Task[] = [
    {
        id: "1",
        title: "Complete project report",
        description: "Finalize and submit the project report by the end of the week.",
        isCompleted: false,
        dueDate: "2023-10-20T17:00:00.000Z",
        dateCreated: "2023-10-10T09:00:00.000Z",
    },
    {
        id: "2",
        title: "Team meeting",
        description: "Discuss project milestones and next steps with the team.",
        isCompleted: true,
        dateCreated: "2023-10-12T11:30:00.000Z",
        dateCompleted: "2023-10-12T12:30:00.000Z",
    },  
    {
        id: "3",
        title: "Update website content",
        description: "Refresh the homepage and about us sections with new information.",
        isCompleted: false,
        dueDate: "2023-10-25T15:00:00.000Z",
        dateCreated: "2023-10-15T10:15:00.000Z",
    },
    {
        id: "4",
        title: "Client follow-up",
        description: "Reach out to clients for feedback on the recent delivery.",
        isCompleted: false,
        dateCreated: "2023-10-18T14:45:00.000Z",
    },
]