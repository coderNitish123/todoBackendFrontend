import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmVlMTk3ZTdlNDk5MjBhZGU5MGI3YiIsIm5hbWUiOiJOaWtoaWwgU2luZ2giLCJlbWFpbCI6ImU1YWM0MWQyNmI2NjIxZDE2YThkMWE2NTkxOGYyZWExYjAyM2I3ZDEyMTkzMTcyMGY3ZmYwN2M3MTIxNjRlMzUiLCJpYXQiOjE3MjQyMjY1MzAsImV4cCI6MTcyNDQ4NTczMH0.Lcy-YnLN4P3FstX1tld_8Mo_zbpJHw9xgCxHIP5lSbc";

// Type guard for AxiosError
export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export default axiosInstance;
