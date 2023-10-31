import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { api } from "../utils/axios";

export type User = {
   username: string;
};

export const useAuthStore = defineStore("auth", () => {
   const user = ref<User | null>(null);
   let token: string | null = null;

   onMounted(() => {
      _updateToken(localStorage.getItem("token"));
   });

   const _updateToken = async (value: typeof token) => {
      user.value = null;

      if (!value) {
         localStorage.removeItem("token");
         return;
      }

      token = value;
      localStorage.setItem("token", token);

      const response = await api.get("/auth");

      user.value = response.data.data;
   };

   const LoginOrRegister = async (
      username: string,
      password: string,
      register: boolean = false
   ) => {
      const response = await api.post(
         register ? "/auth/register" : "/auth/login",
         {
            username,
            password,
         }
      );

      user.value = response.data.user;
      _updateToken(response.data.access_token);
   };

   return {
      user,
      token,
      LoginOrRegister,
   };
});
