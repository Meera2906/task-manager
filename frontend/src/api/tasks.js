const API_URL = "http://localhost:8000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL, {
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export const createTask = async (title, priority) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ title, priority }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create task");
  }
  return response.json();
};

export const updateTask = async (id, completed) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Accept": "application/json" }
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json();
};
