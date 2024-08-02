import axios from 'axios';

const url = "http://localhost:8800/"

export const api = new axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
});

export default api;