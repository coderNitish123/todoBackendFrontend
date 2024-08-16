import axios from '@/utils/axiosInstance';
import { Todo, ApiError } from '@/types/todo';

export const fetchTodos = async (url: string): Promise<Todo[]> => {
  const response = await axios.get(url);
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  try {
    const response = await axios.post('/todos', { title });
    console.log('Todo created:', response.data); // Logging creation response
    return response.data;
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw new Error('Failed to create todo');
  }
};

export const updateTodo = async (id: number, title: string): Promise<void> => {
  try {
    const response = await axios.put(`/todos/${id}`, { title });
    if (response.status === 404) {
      console.error('Todo not found for update:', id);
      throw new Error('Todo not found');
    }
    console.log('Todo updated:', response.data); // Logging update response
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('API Error:', (error.response.data as ApiError).message);
      throw new Error((error.response.data as ApiError).message);
    }
    console.error('Failed to update todo:', error);
    throw new Error('Failed to update todo');
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`/todos/${id}`);
    if (response.status === 404) {
      console.error('Todo not found for deletion:', id);
      throw new Error('Todo not found');
    }
    console.log('Todo deleted:', id); // Logging deletion response
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('API Error:', (error.response.data as ApiError).message);
      throw new Error((error.response.data as ApiError).message);
    }
    console.error('Failed to delete todo:', error);
    throw new Error('Failed to delete todo');
  }
};
