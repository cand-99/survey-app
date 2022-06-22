<template>
  <label class="block sm:text-sm text-gray-700 mt-2 mb-1 font-medium">{{ value }} </label>
</template>

<script setup>
const props = defineProps({
  value:String
});
</script>

<style lang="scss" scoped></style>
