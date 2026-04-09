import React from 'react';

export default function TaskItem({ task, onToggle, onDelete, isProcessing }) {
  return (
    <li className="task-item" style={{ opacity: isProcessing ? 0.6 : 1 }}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          disabled={isProcessing}
        />
        <span className={task.completed ? 'completed' : ''}>
          {task.title}
        </span>
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <button 
        onClick={() => onDelete(task.id)} 
        className="delete-btn"
        disabled={isProcessing}
      >
        Delete
      </button>
    </li>
  );
}
