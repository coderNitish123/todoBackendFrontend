//using swr

import useSWR from "swr";
import axiosInstance from "@/app/utils/axiosInstance";
import { Todo } from "@/app/types/todo";

// Fetch function using axios for useSWR
const fetcher = (url: string) =>
  axiosInstance
    .get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQxNDQ4MTIsImV4cCI6MTcyNDQwNDAxMn0.A8JsywuObtqWu-SXl7A4Z8rcEvEqMEFcC2aMhHfSBiI`,
      },
    })
    .then((res) => res.data);

// Hook for fetching all todos
export const useTodos = () => {
  const { data, error, mutate } = useSWR<Todo[]>("users/alltasks", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
    mutate, // Expose mutate to manually revalidate after operations like create, update, delete
  };
};

// Function to create a todo and trigger revalidation
export const createTodo = async (
  title: string,
  mutate: () => void
): Promise<void> => {
  try {
    await axiosInstance.post(
      "users/add_task",
      { taskName: title },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQxNDQ4MTIsImV4cCI6MTcyNDQwNDAxMn0.A8JsywuObtqWu-SXl7A4Z8rcEvEqMEFcC2aMhHfSBiI`,
        },
      }
    );
    // Trigger revalidation after creating a todo
    mutate();
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw new Error("Failed to create todo");
  }
};

// Function to update a todo and trigger revalidation
export const updateTodo = async (
  _id: string,
  title: string,
  mutate: () => void
): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      `users/update_task`,
      { taskId: _id, taskName: title },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQxNDQ4MTIsImV4cCI6MTcyNDQwNDAxMn0.A8JsywuObtqWu-SXl7A4Z8rcEvEqMEFcC2aMhHfSBiI`,
        },
      }
    );

    if (response.status === 404) {
      throw new Error("Todo not found");
    } else if (response.status !== 200) {
      throw new Error("Failed to update todo");
    }

    // Trigger revalidation after updating a todo
    mutate();
  } catch (error) {
    console.error("Failed to update todo:", error);
    throw new Error("Failed to update todo");
  }
};

// Function to delete a todo and trigger revalidation
export const deleteTodo = async (
  _id: string,
  mutate: () => void
): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      `users/delete`,
      { taskId: _id },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQxNDQ4MTIsImV4cCI6MTcyNDQwNDAxMn0.A8JsywuObtqWu-SXl7A4Z8rcEvEqMEFcC2aMhHfSBiI`,
        },
      }
    );

    if (response.status === 404) {
      throw new Error("Todo not found");
    }

    // Trigger revalidation after deleting a todo
    mutate();
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw new Error("Failed to delete todo");
  }
};

// last update new code
// import useSWR from "swr";
// import axiosInstance, { token } from "@/app/utils/axiosInstance";
// import { Todo } from "@/app/types/todo";

// // Define the authorization token as a constant
// const AUTH_TOKEN = `Bearer ${token}`;

// // Fetch function using axios for useSWR
// const fetcher = (url: string) =>
//   axiosInstance
//     .get(url, {
//       headers: {
//         Authorization: AUTH_TOKEN,
//       },
//     })
//     .then((res) => res.data);

// // Hook for fetching all todos
// export const useTodos = () => {
//   const { data, error, mutate } = useSWR<Todo[]>("users/alltasks", fetcher, {
//     revalidateOnFocus: false,
//   });

//   return {
//     todos: data,
//     isLoading: !error && !data,
//     isError: error,
//     mutate, // Expose mutate to manually revalidate after operations like create, update, delete
//   };
// };

// // Function to create a todo and trigger revalidation
// export const createTodo = async (
//   title: string,
//   mutate: () => void
// ): Promise<void> => {
//   try {
//     await axiosInstance.post(
//       "users/add_task",
//       { taskName: title },
//       {
//         headers: {
//           Authorization: AUTH_TOKEN,
//         },
//       }
//     );
//     // Trigger revalidation after creating a todo
//     mutate();
//   } catch (error) {
//     console.error("Failed to create todo:", error);
//     throw new Error("Failed to create todo");
//   }
// };

// // Function to update a todo and trigger revalidation
// export const updateTodo = async (
//   _id: string,
//   title: string,
//   mutate: () => void
// ): Promise<void> => {
//   try {
//     const response = await axiosInstance.put(
//       "users/update_task",
//       { taskId: _id, taskName: title },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: AUTH_TOKEN,
//         },
//       }
//     );

//     if (response.status === 404) {
//       throw new Error("Todo not found");
//     } else if (response.status !== 200) {
//       throw new Error("Failed to update todo");
//     }

//     // Trigger revalidation after updating a todo
//     mutate();
//   } catch (error) {
//     console.error("Failed to update todo:", error);
//     throw new Error("Failed to update todo");
//   }
// };

// // Function to delete a todo and trigger revalidation
// export const deleteTodo = async (
//   _id: string,
//   mutate: () => void
// ): Promise<void> => {
//   try {
//     const response = await axiosInstance.put(
//       "users/delete",
//       { taskId: _id },
//       {
//         headers: {
//           Authorization: AUTH_TOKEN,
//         },
//       }
//     );

//     if (response.status === 404) {
//       throw new Error("Todo not found");
//     }

//     // Trigger revalidation after deleting a todo
//     mutate();
//   } catch (error) {
//     console.error("Failed to delete todo:", error);
//     throw new Error("Failed to delete todo");
//   }
// };
