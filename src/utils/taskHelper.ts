import { Task } from "../types/task";

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
