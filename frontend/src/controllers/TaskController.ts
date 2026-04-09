import { Request, Response } from 'express';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

let tasks: Task[] = [
  { id: 1, title: "Learn React", completed: true, priority: 'medium', createdAt: new Date().toISOString() },
  { id: 2, title: "Learn Express", completed: false, priority: 'high', createdAt: new Date().toISOString() },
];
let nextId = 3;

export const TaskController = {
  index: (req: Request, res: Response) => {
    res.json(tasks);
  },

  store: (req: Request, res: Response) => {
    const { title, priority } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "" || title.length > 255) {
      return res.status(400).json({ error: "Title is required and must be under 255 chars" });
    }
    
    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = validPriorities.includes(priority) ? priority : 'medium';

    const newTask: Task = {
      id: nextId++,
      title: title.trim(),
      completed: false,
      priority: taskPriority,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  },

  update: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { completed } = req.body;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (typeof completed === "boolean") {
      tasks[taskIndex].completed = completed;
    }
    res.json(tasks[taskIndex]);
  },

  destroy: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: "Deleted" });
  }
};
