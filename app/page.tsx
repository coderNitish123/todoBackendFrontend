"use client";

import useSWR from "swr";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { createTodo, updateTodo, deleteTodo } from "@/app/services/todoService";
import fetcher from "@/app/utils/fetcher";
import { Todo } from "@/app/types/todo";

export default function Home() {
  // Fetch todos using SWR and fetcher
  const {
    data: todos,
    error,
    mutate,
  } = useSWR<Todo[]>("users/alltasks", fetcher);

  if (error) {
    return (
      <div className="text-red-500">Failed to load todos: {error.message}</div>
    );
  }

  if (!todos) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const handleCreate = async (title: string) => {
    try {
      await createTodo(title, mutate); // Pass mutate here
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleUpdate = async (id: string, title: string) => {
    // Ensure id type matches backend expectation
    try {
      await updateTodo(id, title, mutate); // Pass mutate here
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    // Ensure id type matches backend expectation
    try {
      await deleteTodo(id, mutate); // Pass mutate here
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <TodoForm onCreate={handleCreate} />
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
