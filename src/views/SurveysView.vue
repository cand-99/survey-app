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
    <div class="text-center" v-if="surveys.loading">Loading. . .</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <SurveyListItem
          v-for="(survey, index) in surveys.data"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @delete="deleteSurvey(survey)"
        />
      </div>
    <!-- pagination -->
       <div class="mt-4 flex justify-center">
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            v-for="(link, ind) of surveys.links"
            :key="ind"
            :disabled="!link.url"
            @click="getForPage($event, link)"
            v-html="link.label"
            aria-current="page"
            href="#"
            :class="[
              link.active
                ? 'border-indigo-500 text-indigo-600 z-10 bg-indigo-50'
                : 'border-gray-300 text-gray-500 bg-white',
              ind === 0 ? 'rounded-l-md' : '',
              ind === surveys.links.length -1 ? 'rounded-r-md' : '',
            ]"
            class="hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
          >
          </a>
        </nav>
      </div>
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

const surveys = computed(() => store.state.surveys);

store.dispatch("getSurveys");

const deleteSurvey = (survey) => {
  if (confirm("Are you sure??")) {
    store.dispatch("deleteSurvey", survey.id).then(() => {
      store.commit("notify", {
        type: "delete",
        message: "Survey was successfully deleted",
      });
      store.dispatch("getSurveys");
    });
  }
};

const getForPage = (ev, link) => {
  ev.preventDefault();
  if(!link.url || link.active){
    return ;
  }
  store.dispatch("getSurveys", {url: link.url});
}
</script>

<style lang="scss" scoped></style>
