"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { Todo } from "@/types/todo";

const TodoDetail = () => {
  const { id } = useParams(); // Access dynamic route parameter

  const { data: todo, error } = useSWR<Todo>(
    id ? `/todos/${id}` : null,
    fetcher
  );

  if (error) {
    return (
      <div className="text-red-500">Failed to load todo: {error.message}</div>
    );
  }

  if (!todo) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Todo Details</h1>
      <p>Title: {todo.title}</p>
      <p>ID: {todo.id}</p>
    </div>
  );
};

export default TodoDetail;
