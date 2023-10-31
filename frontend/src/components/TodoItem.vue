<script setup lang="ts">
import { useTodosStore } from "../stores/TodosStore";

export type Todo = {
   id: number;
   title: string;
   done?: boolean;
};

defineProps<{
   todo: Todo;
}>();

const todosStore = useTodosStore();
</script>

<template>
   <div
      class="my-2 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-900"
   >
      <input
         class="hidden"
         type="checkbox"
         :id="`task_${todo.id}`"
         :checked="todo.done"
      />
      <label
         class="flex relative items-center py-2 px-2 cursor-pointer"
         :class="{
            'pr-8': todo.done,
         }"
         :for="`task_${todo.id}`"
         @click="() => todosStore.toggleDone(todo.id)"
      >
         <span
            class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"
         >
            <svg
               class="w-4 h-4 fill-current"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
            >
               <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
               />
            </svg>
         </span>
         <span class="ml-4 text-sm">{{ todo.title }}</span>
         <button
            v-if="todo.done"
            @click.stop="todosStore.remove(todo.id)"
            class="absolute right-2"
         >
            <svg
               class="fill-red-500 w-4 h-4"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 30 30"
            >
               <path
                  d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
               />
            </svg>
         </button>
      </label>
   </div>
</template>

<style lang="scss" scoped>
input[type="checkbox"]:checked + label span:first-of-type {
   background-color: #10b981;
   border-color: #10b981;
   color: #fff;
}

input[type="checkbox"]:checked + label span:nth-of-type(2) {
   text-decoration: line-through;
   color: #9ca3af;
}
</style>
