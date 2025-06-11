import React, { useState, useCallback } from 'react';
import { Plus, BarChart3 } from 'lucide-react';
import { useTaskManager } from '@/hooks/useTaskManager';
import { TaskItem } from '@/components/TaskItem';
import { StatsCard } from '@/components/StatsCard';
import '@/style/stylesheet.css';

const TaskManager: React.FC = () => {
  const {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    toggleTaskComplete,
    deleteTask,
    clearCompleted,
    stats,
  } = useTaskManager();

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        addTask();
      }
    },
    [addTask]
  );

  const canAddTask = newTaskText.trim().length > 0;

  return (
    <div className="container">
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="title">Task Manager</h1>
          <p className="subtitle">Stay organized and get things done</p>
        </div>

        {/* Add Task Input */}
        <div className="input-container">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="input"
            maxLength={500}
          />
          <button
            onClick={addTask}
            disabled={!canAddTask}
            className="add-button"
            aria-label="Add task"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <StatsCard label="Total" value={stats.total} color="#3b82f6" />
          <StatsCard label="Pending" value={stats.pending} color="#f59e0b" />
          <StatsCard label="Completed" value={stats.completed} color="#10b981" />
          <StatsCard label="Progress" value={stats.completionRate} color="#8b5cf6" />
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="progress-container">
            <div className="progress-header">
              <span className="progress-label">Progress</span>
              <span className="progress-label">{stats.completionRate}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
        )}

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="clear-button"
          >
            Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
          </button>
        )}

        {/* Tasks List */}
        <div className="tasks-list">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTaskComplete}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <BarChart3 size={64} />
              </div>
              <h3 className="empty-title">No tasks yet</h3>
              <p className="empty-subtitle">Add your first task above to get started!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Built with React and TypeScript</p>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;