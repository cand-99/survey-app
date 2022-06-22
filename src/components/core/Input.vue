<template>
<div class="relative">
  <input
    required
    :class="{ 'border-red-400 text-red-700': errors, 'text-gray-900' : !errors   }"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input"
  />
  <ExclamationCircleIcon :class="{'hidden' : !errors}" class="absolute h-5 w-5 right-2 top-0 translate-y-1/2 text-red-500" />
  <p v-if="errors" class="text-sm text-red-500 font-medium mt-1"> {{ errors[0] }} </p>
</div>
</template>

<script setup>
import { ExclamationCircleIcon } from "@heroicons/vue/solid";
import { onMounted, ref } from 'vue';
   
const props = defineProps(['modelValue', 'errors', 'id', 'type', 'placeholder']);


const emit = defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<style lang="scss" scoped></style>
