import axios from "axios";

const BASE_URL = "https://notesharingbackend-ankitkr437.onrender.com/api/";

export const pf="https://notesharingbackend-ankitkr437.onrender.com/images";

export const publicRequest = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});