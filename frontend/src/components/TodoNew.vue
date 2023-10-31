<script setup lang="ts">
import { ref } from "vue";
import { useTodosStore } from "../stores/TodosStore";

const inputRef = ref<HTMLInputElement | null>(null);

const todosStore = useTodosStore();

const onSubmit = async () => {
   const title = inputRef.value?.value;

   if (!title) return;

   await todosStore.create(title);

   inputRef.value!.value = "";
};
</script>

<template>
   <form @submit.prevent="onSubmit">
      <div
         class="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded"
      >
         <button type="submit">
            <svg
               class="w-5 h-5 text-gray-400 fill-current"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
               />
            </svg>
         </button>
         <input
            ref="inputRef"
            class="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-normal"
            type="text"
            placeholder="add a new task"
            required
            min="1"
         />
      </div>
   </form>
</template>

<style lang="scss" scoped></style>
