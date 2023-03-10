import axios from "axios";
const LocalBASE_URL="http://localhost:8000/api/";
const BASE_URL = "https://notesharingbackend-ankitkr437.onrender.com/api/";

export const pf="https://notesharingbackend-ankitkr437.onrender.com/images";

export const publicRequest = axios.create({
  baseURL: LocalBASE_URL,
});

export const userRequest = axios.create({
  baseURL: LocalBASE_URL,
});