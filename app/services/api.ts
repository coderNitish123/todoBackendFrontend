import axios from "axios";
import { SingleTodo } from "../types/todo";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default axiosInstance;

export const getOneTaskByID = async (id: string): Promise<SingleTodo> => {
  try {
    const response = await axios.get<SingleTodo>(
      "http://localhost:5000/users/task_id",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQyMjU5NjgsImV4cCI6MTcyNDQ4NTE2OH0.MVBKxe7AnEPFPgOt8Pxmcg8fKHMpqqA_DwUKJiXBZQM`,
        },
        data: {
          taskId: id,
        },
      }
    );
    console.log(response.data);
    return response.data as SingleTodo;
  } catch (error) {
    console.error("Error fetching single todo", error);
    throw error;
  }
};
