<template>
  <PageComponent title="Survei">
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Survey</h1>
        <Button :to="{ name: 'SurveyCreate' }">
          <PlusIcon class="h-5 w-5 mr-1" aria-hidden="true" />
          Add New Survey
        </Button>
      </div>
    </template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div
        v-for="survey in surveys"
        :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px"
      >
          <img class="object-contain w-full h-48" :src="survey.image" alt="" />
          <h4 class="mt-4 text-lg font-bold">{{ survey.title }} </h4>
          <div v-html="survey.description" class="overflow-hidden flex-1"></div>

          <div class="mt-4 flex justify-between items-center">
              <Button :to="{name: 'Survey', params: {id: survey.id} }">
                <PencilIcon class="h-4 w-5 mr-1" aria-hidden="true" />
                Edit  
              </Button>

              <div class="flex space-x-2">
               <button>
                    <ShareIcon class="h-5 w-5 mr-1 text-indigo-500" aria-hidden="true" />
               </button>
               <button v-if="survey.id" @click="deleteSurvey(survey)">
                    <TrashIcon class="h-5 w-5 mr-1 text-red-500" aria-hidden="true" />
               </button>
              </div>
          </div>
      </div>
    </div>

    <pre>
    {{ surveys }}
    </pre>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import { PlusIcon, PencilIcon, TrashIcon, ShareIcon } from "@heroicons/vue/solid";
import PageComponent from "../components/PageComponent.vue";
import Button from "../components/button/Button.vue";

const surveys = computed(() => store.state.surveys);

const deleteSurvey = (survey) => {
  if (confirm('Areyou sure??')){
    // delet survey
    alert(`hapus ${survey.id}`)
  }
}

</script>

<style lang="scss" scoped></style>
