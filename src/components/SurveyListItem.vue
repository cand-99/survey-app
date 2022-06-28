<template>
  <div
    class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px"
  >
    <img class="object-contain w-full h-48" :src="survey.image_url" alt="" />
    <h2 class="mt-4 text-lg font-bold">{{ survey.title }}</h2>
    <div v-html="survey.description" class="overflow-hidden flex-1"></div>

    <div class="mt-4 flex justify-between items-center">
      <Button :to="{ name: 'Survey', params: { id: survey.id } }">
        <PencilIcon class="h-4 w-5 mr-1" aria-hidden="true" />
        Edit
      </Button>

      <div class="flex space-x-2">
        <button aria-label="share" type="button">
          <ShareIcon class="h-5 w-5 mr-1 text-indigo-500" aria-hidden="true" />
        </button>
        <button v-if="survey.id" @click="emit('delete', survey)" aria-label="delete" type="button">
          <TrashIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon, ShareIcon } from "@heroicons/vue/solid";
import Button from "../components/button/Button.vue";
const { survey } = defineProps({
  survey: Object,
});

const emit = defineEmits(["delete"]);
</script>

<style lang="scss" scoped></style>
