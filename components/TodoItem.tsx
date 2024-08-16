import { FC, useState } from "react";
import { Todo, ApiError } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (taskId: number, title: string) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = async () => {
    try {
      await onUpdate(todo.id, editTitle);
      console.log(`Updated todo with id: ${todo.id} to title: ${editTitle}`);
      setIsEditing(false);
    } catch (error) {
      const message = (error as ApiError).message || "An error occurred";
      console.error(`Failed to update todo with id: ${todo.id}`, message);
      alert(message); // Display error message
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(todo.id);
      console.log(`Deleted todo with id: ${todo.id}`);
    } catch (error) {
      const message = (error as ApiError).message || "An error occurred";
      console.error(`Failed to delete todo with id: ${todo.id}`, message);
      alert(message); // Display error message
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded shadow">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
      ) : (
        <span>{todo.title}</span>
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
