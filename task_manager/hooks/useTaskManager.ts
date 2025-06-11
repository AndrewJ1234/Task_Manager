import { useState, useCallback, useMemo } from 'react';
import { Task, TaskStats } from '@/types/types';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = useCallback(() => {
    const trimmedText = newTaskText.trim();
    if (!trimmedText) return;

    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: trimmedText,
      completed: false,
      createdAt: new Date(),
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
  }, [newTaskText]);

  const toggleTaskComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, []);

  const stats: TaskStats = useMemo(() => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [tasks]);

  return {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    toggleTaskComplete,
    deleteTask,
    clearCompleted,
    stats,
  };
};