"use client";

import useSWR from "swr";
import { Todo } from "@/types/todo";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todoService";
import fetcher from "@/utils/fetcher";

export default function Home() {
  const { data: todos, error, mutate } = useSWR<Todo[]>("/todos", fetcher);

  if (error)
    return (
      <div className="text-red-500">Failed to load todos: {error.message}</div>
    );
  if (!todos)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );

  const handleCreate = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      mutate([...todos, newTodo], false); // Optimistically update the UI
      console.log(`Created todo with title: ${title}`);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleUpdate = async (id: number, title: string) => {
    try {
      await updateTodo(id, title);
      mutate(); // Refresh the data
      console.log(`Updated todo with id: ${id} to title: ${title}`);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      mutate(
        todos.filter((todo) => todo.id !== id),
        false
      ); // Optimistically update the UI
      console.log(`Deleted todo with id: ${id}`);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">All Todos</h1>
      <TodoForm onCreate={handleCreate} />
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
