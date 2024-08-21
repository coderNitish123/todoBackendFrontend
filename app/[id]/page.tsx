"use client";

import { getOneTaskByID } from "../services/api";

const TodoDetail = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  console.log(params.id);

  const task = getOneTaskByID(params.id);
  console.log("task", task);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Todo Details</h1>
      {params.id}
    </div>
  );
};

export default TodoDetail;
