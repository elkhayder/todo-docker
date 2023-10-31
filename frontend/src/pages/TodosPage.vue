<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue";
import TodoNew from "../components/TodoNew.vue";
import { useAuthStore } from "../stores/AuthStore";
import { useTodosStore } from "../stores/TodosStore";

const todosStore = useTodosStore();
const authStore = useAuthStore();
</script>

<template>
   <div class="flex items-center mb-6">
      <svg
         class="h-8 w-8 text-indigo-500 stroke-current"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
      >
         <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
         />
      </svg>
      <h4 class="font-semibold ml-3 text-lg">
         @{{ authStore.user!.username }}'s Todos
      </h4>
   </div>

   <TodoItem
      v-for="todo of todosStore.todos.filter((x) => !x.done)"
      :key="todo.id"
      :todo="todo"
   />

   <TodoNew />

   <h4 class="font-semibold text-base my-4">Done</h4>

   <TodoItem
      v-for="todo of todosStore.todos.filter((x) => x.done)"
      :key="todo.id"
      :todo="todo"
   />
</template>

<style lang="scss" scoped></style>
