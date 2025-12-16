/* eslint-disable */

import React from "react";
import { Wrench } from "lucide-react";
import TaskCard from "@/features/task_management/components/task_card";


interface ToolCardProps {
  type: string;
  state: string;
  input?: any;
  output?: any;
  errorText?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  type,
  state,
  input,
  output,
  errorText,
}) => {
  switch (type) {
    case "tool-createTask":
      switch (state) {
        case "input-available":
          return (
            <div className="bg-blue-100 p-2 rounded mt-1 mb-2">
              <div className="text-sm text-blue-500">Creating task...</div>
            </div>
          );
        case "output-available":
          return <TaskCard task={output} />;
        case "output-error":
          return (
            <div className="bg-red-100 p-2 rounded mt-1 mb-2">
              <div className="text-sm text-red-500">Error: {errorText}</div>
            </div>
          );
        default:
          return null;
      }
    case "tool-getAllTasks":
      switch (state) {
        case "input-available":
          return (
            <div className="bg-blue-100 p-2 rounded mt-1 mb-2">
              <div className="text-sm text-blue-500">Fetching your tasks...</div>
            </div>
          );
        case "output-available":
          return (
            <div className="bg-blue-100 p-2 rounded mt-1 mb-2">
              <div className="text-sm text-blue-500">Found {output.length} tasks.</div>
            </div>
            );
        case "output-error":
          return (
            <div className="bg-red-100 p-2 rounded mt-1 mb-2">
              <div className="text-sm text-red-500">Error: {errorText}</div>
            </div>
          );
        default:
          return null;
      }

    default:
      return (
        <div className="bg-gray-100 p-2 rounded mt-1 mb-2">
          <div className="text-sm text-gray-500">
            <Wrench /> {type}
          </div>
        </div>
      );
  }
};
