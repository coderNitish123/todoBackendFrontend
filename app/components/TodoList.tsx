import { FC, useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "@/app/types/todo";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:5000/";

interface TodoListProps {
  onUpdate: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoList: FC<TodoListProps> = ({ onUpdate, onDelete }) => {
  const [localTodos, setLocalTodos] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all tasks from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/alltasks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQyMjU1MzksImV4cCI6MTcyNDQ4NDczOX0.8GoUxjiOAatMPnHUnOuvds3lpVMgkzQZndfvvuABkSE`,
          },
        });
        console.log("Backend response:", response.data); // Log response data
        setLocalTodos(response.data); // Update localTodos with the response data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Failed to fetch todos. Please try again.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add new task and update localTodos
  const handleAdd = async (taskName: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/add_task`, {
        taskName,
      });
      console.log("New task added:", response.data); // Log the added task

      // Ensure the previous state is initialized correctly before updating
      setLocalTodos((prevTodos) => ({
        tasks: [...(prevTodos?.tasks || []), response.data], // Append the new task
      }));
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo. Please try again.");
    }
  };

  // Handle task update
  const handleUpdate = async (id: string, title: string) => {
    try {
      await onUpdate(id, title);
      setLocalTodos((prevTodos) => ({
        tasks:
          prevTodos?.tasks.map((todo) =>
            todo._id === id ? { ...todo, taskName: title } : todo
          ) || [], // Ensure `tasks` is updated safely
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo. Please try again.");
    }
  };

  // Handle task deletion
  const handleDelete = async (_id: string) => {
    try {
      await onDelete(_id);
      setLocalTodos((prevTodos) => ({
        tasks: prevTodos?.tasks.filter((todo) => todo._id !== _id) || [], // Ensure `tasks` is filtered safely
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo. Please try again.");
    }
  };

  // UI rendering
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <p className="mb-4 text-lg">Total Todos: {localTodos?.tasks.length}</p>
      <ul className="list-disc pl-5">
        {localTodos?.tasks?.length > 0 ? (
          localTodos?.tasks.map((todo, index) => (
            <li
              key={todo._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {index + 1}. {todo.taskName}
              </span>
              <button
                className="bg-blue-600 text-white rounded-lg px-4 py-2"
                onClick={() => router.push(`/${todo._id}`)}
              >
                {" "}
                View Single Task{" "}
              </button>
              <div>
                <button
                  onClick={async () => {
                    const title = prompt("Enter new title", todo.taskName);
                    if (title !== null) {
                      await handleUpdate(todo._id, title);
                    }
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={async () => {
                    const confirmDelete = confirm(
                      "Are you sure you want to delete this todo?"
                    );
                    if (confirmDelete) {
                      await handleDelete(todo._id);
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
