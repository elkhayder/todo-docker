<script setup lang="ts">
import LoadingSpinner from "./components/LoadingSpinner.vue";
import TodosPage from "./pages/TodosPage.vue";
import AuthPage from "./pages/AuthPage.vue";

import { useAuthStore } from "./stores/AuthStore";
import { useLoadingStore } from "./stores/LoadingStore";
import { useTodosStore } from "./stores/TodosStore";

useTodosStore(); // launching it here
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
</script>

<template>
   <div
      class="flex items-center justify-center font-medium w-screen h-screen bg-gray-100 dark:bg-gray-900 p-8"
   >
      <div
         class="relative overflow-hidden max-h-full max-w-full p-8 rounded-lg shadow-lg w-96 bg-white overflow-y-auto dark:bg-gray-800 text-gray-600 dark:text-gray-200"
      >
         <div
            v-if="loadingStore.isLoading"
            class="absolute inset-0 bg-gray-700 flex items-center justify-center bg-opacity-80"
         >
            <LoadingSpinner />
         </div>

         <TodosPage v-if="authStore.user" />
         <AuthPage v-else />
      </div>
   </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
   width: 6px;
   border-radius: 8px;
}

/* Track */
::-webkit-scrollbar-track {
   background: #e3e3e3;
}

/* Handle */
::-webkit-scrollbar-thumb {
   background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
   background: #555;
}
</style>
