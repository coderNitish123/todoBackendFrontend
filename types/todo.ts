// Define the type for a Todo item
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Define an interface for error handling
export interface ApiError {
  message: string;
}
