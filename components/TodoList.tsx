import { FC } from "react";
import { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoList: FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  return (
    <div>
      <p className="mb-4 text-lg">Total Todos: {todos.length}</p>
      <ul className="list-disc pl-5">
        {todos.slice(0, 10).map((todo, index) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span>
              {index + 1}. {todo.title}
            </span>
            <div>
              <button
                onClick={async () => {
                  const title = prompt("Enter new title", todo.title);
                  if (title !== null) {
                    try {
                      await onUpdate(todo.id, title);
                      console.log(`Todo ${todo.id} updated to title: ${title}`);
                    } catch (error) {
                      console.error(`Failed to update Todo ${todo.id}:`, error);
                    }
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
                    try {
                      await onDelete(todo.id);
                      console.log(`Todo ${todo.id} deleted`);
                    } catch (error) {
                      console.error(`Failed to delete Todo ${todo.id}:`, error);
                    }
                  }
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
