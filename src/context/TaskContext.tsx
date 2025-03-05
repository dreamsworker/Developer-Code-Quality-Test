import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      title: "Initial Task",
      status: "todo",
      priority: "medium",
      createdAt: new Date(),
      description: "This is a sample task to start with",
    },
    {
      id: uuidv4(),
      title: "Second Task",
      status: "todo",
      priority: "high",
      createdAt: new Date(),
      description: "This is another task",
    },
  ]);

  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
      status: taskData.status || "todo",
    };

    if (newTask.title.length > 100) {
      alert("Task title too long!");
      return;
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    // 修改updateTask的邏輯，將修改的邏輯放入setTasks，以解除task的依賴，別且避免潛在的bug
    setTasks((prevTasks) => {
      const targetIndex = prevTasks.findIndex((task) => task.id === id);
      // 只更新特定的task，避免未來優化上產生問題
      if (targetIndex !== -1) {
        let newTasks = [...prevTasks];
        newTasks[targetIndex] = {
          ...prevTasks[targetIndex],
          ...updates,
          updatedAt: new Date(),
        };
        return newTasks;
      }
      return prevTasks;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    // 修改deleteTask的邏輯，將刪除的邏輯放入setTasks，以解除task的依賴，別且避免潛在的bug
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  // 移除原本的filterTasks，將其放到TaskList中
  // 移除不必要的dependency
  const contextValue = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
    }),
    [tasks]
  );
  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
