import { FC, useState } from "react";
import { SingleTodo, ApiError } from "@/app/types/todo";

interface TodoItemProps {
  todo: SingleTodo; // Use SingleTodo here
  onUpdate: (taskId: string, taskName: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.taskName);

  // Reset editing state when todo prop changes
  useState(() => {
    setEditTitle(todo.taskName);
  }, [todo]);

  const handleUpdate = async () => {
    try {
      await onUpdate(todo._id, editTitle);
      setIsEditing(false);
    } catch (error) {
      const message = (error as ApiError).message || "An error occurred";
      alert(message); // Display error message
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(todo._id);
    } catch (error) {
      const message = (error as ApiError).message || "An error occurred";
      alert(message); // Display error message
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded shadow mb-2">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-2 rounded w-full"
          autoFocus // Automatically focus the input when editing
        />
      ) : (
        <span className="flex-1">{todo.taskName}</span>
      )}
      <div className="space-x-2">
        {isEditing ? (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
