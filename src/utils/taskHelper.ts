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
