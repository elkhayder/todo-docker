<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.ts";

const isRegister = ref(false);
const authStore = useAuthStore();

const errors = reactive<any>({});

const onSubmit = async (e: Event) => {
   const data = new FormData(e.target as HTMLFormElement);
   Object.assign(errors, {});

   try {
      await authStore.LoginOrRegister(
         data.get("username") as string,
         data.get("password") as string,
         isRegister.value
      );
   } catch (e: any) {
      console.log(e);

      Object.assign(errors, e.response.data.errors);
   }
};
</script>

<template>
   <div class="flex items-center mb-6">
      <svg
         viewBox="0 0 330 330"
         xml:space="preserve"
         class="h-8 w-8 text-indigo-500 stroke-current fill-current"
      >
         <g>
            <path
               d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
		S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
		s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
		C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
            />
         </g>
      </svg>

      <h4 class="font-semibold ml-3 text-lg">
         {{ isRegister ? "Register" : "Login" }}
      </h4>
   </div>
   <form @submit.prevent="onSubmit">
      <div class="input-group">
         <label for="username">Username</label>
         <input
            type="text"
            id="username"
            name="username"
            placeholder="elkhayder"
            required
         />
         <div class="text-sm font-light text-red-600" v-if="errors.username">
            <p class="my-2" v-for="e of errors.username">{{ e }}</p>
         </div>
      </div>

      <div class="input-group">
         <label for="password">Password</label>
         <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
         />
         <div class="text-sm font-light text-red-600" v-if="errors.password">
            <p class="my-2" v-for="e of errors.password">{{ e }}</p>
         </div>
      </div>

      <button type="submit">{{ isRegister ? "Sign Up" : "Login" }}</button>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
         Don’t have an account yet?
         <a
            @click="isRegister = !isRegister"
            href="#"
            class="font-medium hover:underline"
         >
            {{ isRegister ? "Login" : "Sign Up" }}
         </a>
      </p>
   </form>
</template>

<style lang="scss" scoped>
label {
   @apply block mb-2 text-sm text-gray-900 dark:text-white;
}

input {
   @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.input-group {
   @apply mb-4;
}

button {
   @apply mb-2 w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-500 focus:ring-white;
}
</style>
