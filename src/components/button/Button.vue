<template>
  <RouterLink v-if="props.to" :to="to" :class="[{'w-full' : full}, classes]">
    <slot> </slot>
  </RouterLink>

  <button v-else :class="[{'w-full justify-center relative' : full}, classes] " type="sumbit">
    <slot> </slot>
  </button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  to: [Object, String],
  color: {
    type: String,
    default: "indigo",
  },
  full: Boolean

});

let classes = ref([
  "flex",
  "text-sm",
  "border",
  "border-transparent",
  "items-center",
]);




switch (props.color) {
    case "indigo":
      classes.value = [
        ...classes.value,
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500",
        "rounded-md",
        "px-4",
        "py-2",
        "font-medium",
        "text-white",
         "text-sm",
      ];
      break;
    case "red":
      classes.value = [
        ...classes.value,
        "bg-red-600",
        "hover:bg-red-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-red-500",
        "rounded-md",
        "px-4",
        "py-2",
        "font-medium",
        "text-white",
        "text-sm",
      ];
      break;
    case "green":
      classes.value = [
        ...classes.value,
        "bg-emerald-600",
        "hover:bg-emerald-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-emerald-500",
        "rounded-md",
        "px-4",
        "py-2",
        "font-medium",
        "text-white",
        "text-sm",
      ];
      break;
    case "gray":
      classes.value = [
        ...classes.value,
        "bg-gray-600",
        "hover:bg-gray-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-gray-500",
        "px-2",
        "py-1",
        "text-white",
        "text-sm",
      ];
      break;
    case "outline":
      classes.value = [
        ...classes.value,
        "px-2",
        "py-1",
        "text-red-500",
        "hover:border-red-500",
         "text-xs",
  
      ];
      break;
  }
</script>

<style lang="scss" scoped></style>
