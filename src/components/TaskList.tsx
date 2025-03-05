import React, { useState, useMemo, useCallback } from "react";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";
import { TaskActions } from "./TaskActions";
import {
  TaskPriorities,
  TaskPrioritiesTextMap,
  TaskStatus,
  TaskStatusTextMap,
} from "../utils/taskHelper";

/*
  將TasksFilter相關的邏輯從TaskList中分離，使羅更加清晰
*/
const useTasksFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState<{
    status?: Task["status"];
    priority?: Task["priority"];
  }>({});
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        (!filter.status || task.status === filter.status) &&
        (!filter.priority || task.priority === filter.priority)
    );
  }, [tasks, filter]);

  const handleSetFilter = (
    filed: keyof typeof filter,
    value: Task["status"] | Task["priority"]
  ) => {
    setFilter((prev) => ({
      ...prev,
      [filed]: value,
    }));
  };

  return {
    filteredTasks,
    filter,
    handleSetFilter,
  };
};

export const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  const { handleSetFilter, filter, filteredTasks } = useTasksFilter(tasks);

  const handleSetFilterStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleSetFilter("status", e.target.value as Task["status"]);
    },
    []
  );
  const handleSetFilterPriority = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleSetFilter("priority", e.target.value as Task["priority"]);
    },
    []
  );

  return (
    <div>
      {/* 操作欄位 */}
      <h1 className="text-xl font-bold my-3">Control Panel</h1>
      <div className="flex">
        <select value={filter.status || ""} onChange={handleSetFilterStatus}>
          <option value="">All Statuses</option>
          {TaskStatus.map((status) => (
            <option key={status} value={status}>
              {TaskStatusTextMap[status]}
            </option>
          ))}
        </select>

        <select
          value={filter.priority || ""}
          onChange={handleSetFilterPriority}
        >
          <option value="">All Priorities</option>
          {TaskPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {TaskPrioritiesTextMap[priority]}
            </option>
          ))}
        </select>
      </div>
      {/* task 列表 */}
      <h1 className="text-xl font-bold my-3">Task list</h1>
      <div className="flex flex-col">
        {filteredTasks.map((task) => (
          <div className="flex gap-1" key={task.id}>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <TaskActions task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};
