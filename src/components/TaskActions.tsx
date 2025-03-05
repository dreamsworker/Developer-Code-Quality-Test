import { useCallback } from "react";
import { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";

export const TaskActions: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks();
  const handleDelete = useCallback(() => {
    // Potential UX anti-pattern
    const confirmDelete = window.confirm(`Delete task "${task.title}"?`);
    if (confirmDelete) {
      deleteTask(task.id);
    }
  }, [task]);

  const handleStatusChange = useCallback(() => {
    const statusMap: Record<Task["status"], Task["status"]> = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    };
    updateTask(task.id, { status: statusMap[task.status] });
  }, [task]);

  return (
    <>
      <button
        className="border border-black rounded-md p-1"
        onClick={handleStatusChange}
      >
        Change Status
      </button>
      <button
        className="border border-black rounded-md p-1"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
};
