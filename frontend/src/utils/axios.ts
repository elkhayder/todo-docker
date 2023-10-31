import axios from "axios";
import { useLoadingStore } from "../stores/LoadingStore";

export const api = axios.create({
   baseURL: import.meta.env.PROD ? "/api" : "http://127.0.0.1:8000/api",
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

api.interceptors.request.use((config) => {
   const loadingStore = useLoadingStore();
   const token = localStorage.getItem("token");

   loadingStore.count++;

   if (token) config.headers.Authorization = `Bearer ${token}`;

   return config;
});

api.interceptors.response.use(
   (response) => {
      const loadingStore = useLoadingStore();

      loadingStore.count--;

      return response;
   },
   (error) => {
      const loadingStore = useLoadingStore();

      loadingStore.count--;

      switch (error.response.status) {
         case 429:
            alert("Slow down buddy, you are moving too fast!");
            break;

         default:
      }

      throw error;
   }
);
