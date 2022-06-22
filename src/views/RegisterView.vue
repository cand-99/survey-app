<template>
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Register for free
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      <RouterLink
        :to="{ name: 'Login' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Login
      </RouterLink>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="register">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <Label for="fullName" value="Full Name" />
        <Input
          id="fullName"
          type="text"
          placeholder="Full Name"
          v-model="user.name"
          :errors="errorMsg.name"
        />
      </div>

      <div>
        <Label for="email-address" value="Email address" />
        <Input
          id="email-address"
          type="email"
          placeholder="Email address"
          v-model="user.email"
          :errors="errorMsg.email"
        />
      </div>

      <div>
        <Label for="password" value="Password" />
        <Input
          class=""
          id="password"
          type="password"
          placeholder="Password"
          v-model="user.password"
          :errors="errorMsg.password"
        />
      </div>

      <div>
        <Label for="confirm-password" value="Confirm Password" />
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          v-model="user.password_confirmation"
          :errors="errorMsg.password_confirmation"
        />
      </div>
    </div>

    <div>
      <Button :full="true">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Sign up
      </Button>
    </div>
  </form>
</template>

<script setup>
import Button from "../components/button/Button.vue";
import Input from "../components/core/Input.vue";
import Label from "../components/core/Label.vue";
import { LockClosedIcon } from "@heroicons/vue/solid";

import store from "../store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const errorMsg = ref({});

const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};
const register = (ev) => {
  ev.preventDefault();
  store
    .dispatch("register", user)
    .then((res) => {
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      errorMsg.value = err.response.data.errors;
    });
};
</script>
