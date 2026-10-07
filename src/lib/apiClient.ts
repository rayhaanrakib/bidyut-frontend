import { ofetch } from "ofetch";

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api/v1";

const apiClient = ofetch.create({
  baseURL: API_URL,
  credentials: "include",
});

export default apiClient;