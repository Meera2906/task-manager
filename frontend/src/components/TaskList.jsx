import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, loading, onToggle, onDelete, processingIds, filter }) {
  if (loading) {
    return <div className="loading-spinner">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    let emptyMsg = "No tasks found";
    if (filter === 'completed') emptyMsg = "No completed tasks yet";
    if (filter === 'active') emptyMsg = "No active tasks yet";
    return <div className="empty-state">{emptyMsg}</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isProcessing={processingIds && processingIds.has(task.id)}
        />
      ))}
    </ul>
  );
}
