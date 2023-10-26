import { defineStore } from "pinia";
import { onMounted, reactive, ref } from "vue";

import type { Todo } from "../components/TodoItem.vue";
import { ApiURL } from "../utils/constants";

export const useTodosStore = defineStore("todos", () => {
   const todos = reactive<Todo[]>([]);
   const isLoading = ref(false);

   onMounted(async () => {
      isLoading.value = true;

      const r = await fetch(ApiURL("/todos")).then((x) => x.json());

      todos.push(...r.data);

      isLoading.value = false;
   });

   const toggleDone = async (id: number) => {
      isLoading.value = true;

      const todo = todos.filter((x) => x.id == id)[0];
      if (!todo) return;

      const r = await fetch(ApiURL("/todos/" + id), {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            done: !todo.done,
         }),
      }).then((x) => x.json());

      todo.done = r.data.done;

      isLoading.value = false;
   };

   const create = async (title: string) => {
      isLoading.value = true;

      const r = await fetch(ApiURL("/todos"), {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            title,
            done: false,
         }),
      }).then((x) => x.json());

      todos.push(r.data);

      isLoading.value = false;
   };

   return {
      todos,
      isLoading,
      toggleDone,
      create,
   };
});
