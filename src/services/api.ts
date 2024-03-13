import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

export const apiFetcher = (resource: string) =>
  api.get(resource).then((res) => res.data);

api.interceptors.request.use();

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
