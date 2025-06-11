import React, { useState, useCallback } from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Task } from '@/types/types';
import '@/style/stylesheet.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const handleToggle = useCallback(() => onToggle(task.id), [task.id, onToggle]);
  const handleDelete = useCallback(() => onDelete(task.id), [task.id, onDelete]);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        onClick={handleToggle}
        className="checkbox-button"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? (
          <CheckCircle size={24} color="#10b981" />
        ) : (
          <Circle size={24} color="#9ca3af" />
        )}
      </button>

      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>

      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label="Delete task"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};