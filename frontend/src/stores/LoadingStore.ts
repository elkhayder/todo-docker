import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
   const count = ref(0);
   const isLoading = computed(() => count.value != 0);

   return {
      isLoading,
      count,
   };
});
