export const API_BASE_URL = import.meta.env.PROD
   ? "/api"
   : "http://127.0.0.1:8000/api";

export const ApiURL = (path: string) => API_BASE_URL + path;