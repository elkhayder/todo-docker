<script setup lang="ts">
import LoadingSpinner from "./components/LoadingSpinner.vue";
import TodoItem from "./components/TodoItem.vue";
import TodoNew from "./components/TodoNew.vue";
import { useTodosStore } from "./stores/TodosStore";

const todosStore = useTodosStore();
</script>

<template>
   <div
      class="flex items-center justify-center font-medium w-screen h-screen bg-gray-100 dark:bg-gray-900"
   >
      <div
         class="relative overflow-hidden max-w-full p-8 rounded-lg shadow-lg w-96 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200"
      >
         <div
            v-if="todosStore.isLoading"
            class="absolute inset-0 bg-gray-700 flex items-center justify-center bg-opacity-80"
         >
            <LoadingSpinner />
         </div>

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
            <h4 class="font-semibold ml-3 text-lg">Todos</h4>
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
      </div>
   </div>
</template>

<style scoped></style>
