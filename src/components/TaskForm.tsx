import { useCallback } from "react";
import { TaskPriorities } from "../utils/taskHelper";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const handleAddTask = useCallback((formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as Task["priority"];

    addTask({
      title: title,
      description: description,
      status: "todo",
      priority: priority,
    });
  }, []);
  return (
    <>
      <h1 className="text-xl font-bold my-3">TaskForm</h1>
      <form className="border-2 border-black py-2" action={handleAddTask}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border-2 border-black"
          required
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          className="border-2 border-black"
          required
        />
        <br />
        <br />
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          className="border-2 border-black"
          required
        >
          {TaskPriorities.map((priorities) => (
            <option value={priorities} key={priorities}>
              {priorities}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" className="border-2 border-black px-2">
          Add Task
        </button>
      </form>
    </>
  );
};
