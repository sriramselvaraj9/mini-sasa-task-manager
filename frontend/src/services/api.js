// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Signup
export const signup = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.');
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.');
  }
};

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to fetch tasks');
    }

    const data = await response.json();
    return data.tasks;
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.');
  }
};

// Create a task
export const createTask = async (title, description) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create task');
    }
    return data.task;
  } catch (error) {
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, updates) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update task');
    }
    return data.task;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete task');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
