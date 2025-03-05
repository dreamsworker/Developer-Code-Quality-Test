import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export const TaskStatus: Task["status"][] = [
  "todo",
  "in-progress",
  "done",
] as const;

export const TaskPriorities: Task["priority"][] = [
  "low",
  "medium",
  "high",
] as const;

export const TaskStatusTextMap: Record<Task["status"], string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
} as const;

export const TaskPrioritiesTextMap: Record<Task["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const;

export const createTaskId = () => uuidv4();
