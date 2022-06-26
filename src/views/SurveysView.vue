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
      <SurveyListItem
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @delete="deleteSurvey(survey)"
      />
    </div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import { PlusIcon } from "@heroicons/vue/solid";
import PageComponent from "../components/PageComponent.vue";
import Button from "../components/button/Button.vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const surveys = computed(() => store.state.surveys.data);

store.dispatch("getSurveys");

const deleteSurvey = (survey) => {
  
  if (confirm('Are you sure??')){
     store.dispatch("deleteSurvey", survey.id).then(() => {
      store.dispatch("getSurveys");
    });
    }
};
</script>

<style lang="scss" scoped></style>
