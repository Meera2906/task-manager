import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title, priority) => {
    try {
      const newTask = await createTask(title, priority);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      throw err;
    }
  };

  const [processingIds, setProcessingIds] = useState(new Set());

  const handleToggleTask = async (id, completed) => {
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      const updated = await updateTask(id, completed);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDeleteTask = async (id) => {
    setProcessingIds(prev => new Set(prev).add(id));
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      
      <main>
        <TaskForm onAddTask={handleAddTask} />
        
        <FilterBar filter={filter} setFilter={setFilter} />
        
        {error && <div className="error-banner">{error}</div>}
        
        <ErrorBoundary>
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            processingIds={processingIds}
            filter={filter}
          />
        </ErrorBoundary>
      </main>

      <footer>
        <p>In-memory storage (resets on server restart)</p>
      </footer>
    </div>
  );
}
