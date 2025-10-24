import axios from 'axios';

// Base URL for Spring Boot backend
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/items`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const taskService = {
  addTask: async (task) => {
    try {
      const response = await api.post('/add', task);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error adding task');
    }
  },

  editTask: async (task) => {
    try {
      const response = await api.put('/edit', task);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error updating task');
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await api.get(`/get/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Task not found');
    }
  },

  getAllTasks: async () => {
    try {
      const response = await api.get('/getAll');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error fetching tasks');
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error deleting task');
    }
  },
};

export default taskService;
