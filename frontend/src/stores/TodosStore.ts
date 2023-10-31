import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";

import type { Todo } from "../components/TodoItem.vue";
import { api } from "../utils/axios";
import { useAuthStore } from "./AuthStore";

export const useTodosStore = defineStore("todos", () => {
   const authStore = useAuthStore();

   const todos = reactive<Todo[]>([]);

   const user = computed(() => authStore.user);

   watch(user, async () => {
      if (!user) return;

      const r = await api.get("/todos").then((x) => x.data);

      todos.length = 0;
      todos.push(...r.data);
   });

   // onMounted(async () => {
   //    if (!user) return;

   //    const r = await api.get("/todos").then((x) => x.data);

   //    todos.length = 0;
   //    todos.push(...r.data);
   // });

   const toggleDone = async (id: number) => {
      const todo = todos.filter((x) => x.id == id)[0];
      if (!todo) return;

      await api
         .put("/todos/" + id, {
            done: !todo.done,
         })
         .then((x) => {
            todo.done = x.data.data.done;
         });
   };

   const create = async (title: string) => {
      await api
         .post("/todos", {
            title,
            done: false,
         })
         .then((x) => {
            todos.push(x.data.data);
         });
   };

   const remove = async (id: number) => {
      api.delete("/todos/" + id).then(() => {
         todos.splice(
            todos.findIndex((x) => x.id == id),
            1
         );
      });
   };

   return {
      todos,
      toggleDone,
      create,
      remove,
   };
});
