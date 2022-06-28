<template>
<Transition name="slide-fade">
  <div
    v-if="notification.show"
    class="fixed w-[300px] left-4 bottom-4 py-3 px-4 text-sm font-medium rounded-md flex items-center"
    :class="[notification.type === 'success' ? 'bg-emerald-50 text-emerald-800': 'bg-red-50 text-red-800']"
  >
    <CheckCircleIcon v-if="notification.type === 'success'" class="h-5 w-5 mr-2 text-emerald-400" />
    <XCircleIcon v-else class="h-5 w-5 mr-2 text-red-400"/>
    {{ notification.message }}
  </div>
</Transition>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon  } from "@heroicons/vue/solid";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const notification = computed(() => store.state.notification);
</script>

<style scoped>
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
