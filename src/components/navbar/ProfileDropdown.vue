<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="item in userNavigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <a
            :href="item.href"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            >{{ item.name }}</a
          >
        </MenuItem>
        <a
          @click="logout"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >Sign Out</a
        >
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const logout = () => {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Login",
    });
  });
};

 store.dispatch("getUser");

const props = defineProps(["user", "userNavigation"]);
</script>

<style lang="scss" scoped></style>
