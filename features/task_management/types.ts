export type Task = {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: string; // ISO 8601 formatted date string example "2023-10-15T14:48:00.000Z"
    dateCreated: string; // ISO 8601 formatted date string
    dateCompleted?: string; // ISO 8601 formatted date string
}