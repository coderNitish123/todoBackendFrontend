import { FC, useState } from "react";

interface TodoFormProps {
  onCreate: (title: string) => Promise<void>;
}

const TodoForm: FC<TodoFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await onCreate(title);
      setTitle(""); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        className="border border-gray-300 p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
