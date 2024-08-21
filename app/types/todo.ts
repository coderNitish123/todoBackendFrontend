export interface ApiError {
  message: string;
}

export interface Todo {
  tasks: SingleTodo[];
}

// Define the type for a Todo item
export interface SingleTodo {
  _id: string; // MongoDB ObjectId as a string
  taskName: string;
  taskStatus: string; // You might want to use a union type if there are specific statuses
  taskEnd: string | null; // Assuming taskEnd can be a string (ISO date) or null
  taskDate: string;
}
