import axios from "./axiosInstance";

const fetcher = async (url?: string) => {
  try {
    const response = await axios.get(url ?? "", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQxNDQ4MTIsImV4cCI6MTcyNDQwNDAxMn0.A8JsywuObtqWu-SXl7A4Z8rcEvEqMEFcC2aMhHfSBiI`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
};

export default fetcher;
