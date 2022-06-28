<template>
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      <RouterLink
        :to="{ name: 'Register' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        >Register
      </RouterLink>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <Label for="email-address" value="Email address" />
        <Input
          class="rounded-t-md"
          id="email-address"
          type="email"
          placeholder="Email address"
          v-model="user.email"
        />
      </div>
      <div>
        <Label for="password" value="Password" />
        <Input
          class="rounded-b-md"
          id="password"
          type="password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          v-model="user.remember"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>
    </div>

    <div>
      <Button :full="true" :class="[errorMsg ? 'shake' : '']">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Sign in
      </Button>
    </div>
  </form>
<Transition name="slide-fade">
  <div
    v-if="errorMsg"
    class="bg-red-500 max-w-md w-full py-2 px-5 rounded text-white flex justify-between items-center fixed top-4 "
  >
    <p>Login Failed</p>
    <span
      class="w-8 h-8 rounded-full hover:bg-red-600 flex cursor-pointer p-1 transition-colors"
      @click="errorMsg = ''"
    >
      <XIcon class="h-full w-full m-auto" />
    </span>
  </div>
  </Transition>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
import Button from "../components/button/Button.vue";
import Input from "../components/core/Input.vue";
import Label from "../components/core/Label.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
import store from "../store";

const errorMsg = ref("");

const user = {
  email: "",
  password: "",
  remember: false,
};

const login = (ev) => {
  ev.preventDefault();
  store
    .dispatch("login", user)
    .then(() => {
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      errorMsg.value = err.response.data;
      setTimeout(() => {
        errorMsg.value = "";
      }, 3000);
    });
};
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
