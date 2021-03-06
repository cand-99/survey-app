<template>
  <PageComponent>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>

    <div class="text-center" v-if="surveyLoading">
      Loading. . . 
    </div>

    <form v-else class="space-y-7" @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- Image -->
          <div>
            <Label for="image" value="Image" />
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  id="image"
                  type="file"
                  @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!--/ Image -->

          <div>
            <Label for="title" value="Title" />
            <Input id="title" type="text" v-model="model.title" />
          </div>

          <div>
            <Label for="description" value="Description" />
            <textarea
              id="description"
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Describe your survey"
              v-model="model.description"
            ></textarea>
          </div>

          <div>
            <Label for="expiredDate" value="Expired Date" />
            <Input
              id="expiredDate"
              type="date"
              name="expire_date"
              v-model="model.expire_date"
            />
          </div>

          <div class="flex items-center">
            <input
              id="status"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              v-model="model.status"
            />
            <Label
              for="status"
              value="Active"
              class="ml-2 block text-sm text-gray-900 mt-0 mb-0"
            />
          </div>
        </div>

        <!-- Survey Field -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Question</h2>
            <Button
              class="ml-auto"
              color="gray"
              @click="addQuestion()"
              type="button"
            >
              <PlusIcon class="h-4 w-4 mr-2" />
              Add Qestion
            </Button>
          </div>

        <!-- <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div> -->
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button class="ml-auto"> Save </Button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "@heroicons/vue/solid";
import { computed, ref, watch } from "vue";
import store from "../store";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import Input from "../components/core/Input.vue";
import Label from "../components/core/Label.vue";
import Button from "../components/button/Button.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue"

const route = useRoute();
const router = useRouter();

let model = ref({
  title: "",
  status: "",
  description: "",
  image: null,
  expire_date: null,
  questions: [],
});

const surveyLoading = computed (() => store.state.currentSurvey.loading);

watch(
  () => store.state.currentSurvey.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status:newVal.status !== "draft",
    };
  }
);

if (route.params.id) {
  store.dispatch('getSurvey', route.params.id);
}

const onImageChoose = (ev) => {
  const file = ev.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    model.value.image = reader.result;

    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

const addQuestion = (index) => {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}

const deleteQuestion = (question) => {
  model.value.questions = model.value.questions.filter(
    (q) => q.id !== question.id
  ); 
}

const questionChange = (question) => {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));

    }
    return q;
  });
}

const saveSurvey = () => {
   store.dispatch("saveSurvey", { ...model.value }).then(({ data }) => {
    router.push({
      name: "Survey",
      params: {id: data.data.id}
     });
  });
}

</script>

<style lang="scss" scoped></style>
