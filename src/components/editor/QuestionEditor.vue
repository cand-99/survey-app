<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">{{ index + 1 }} .{{ model.question }}</h3>

    <div class="flex items-center gap-2">
      <!-- add -->
      <Button type="button" color="gray" @click="addQuestion()">
         <PlusIcon class="h-4 w-4 mr-1"/>
        <span class="text-xs">Add</span>
      </Button>
      <!-- delete -->

      <Button type="button" color="outline" @click="deleteQuestion()">
        <TrashIcon class="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  </div>
  <div class="grid gap-3 grid-cols-12">
    <!-- question -->
    <div class="col-span-9 mt-3">
      <Label :for="`question_text_` + model.data" value="Question Text" />
      <Input
        :name="`question_text_` + model.data"
        :id="`question_text_` + model.data"
        v-model="model.question"
        @change="dataChange"
      />
    </div>
    <!-- question type -->
    <div class="mt-3 col-span-3">
      <Label for="question_type" value="Select Question Type" />
      <select
        name="question_type"
        id="question_type"
        v-model="model.type"
        @change="typeChange"
        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      >
         <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
  </div>
  <!-- question desc -->
  <div class="mt-3 col-span-9">
    <Label :for="`question_description_` + model.id" value="Description" />
    <textarea
      :name="`question_description_` + model.id"
      :id="`question_description_` + model.id"
      @change="dataChange"
      v-model="model.description"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    ></textarea>
  </div>
        <!-- data -->
        <div>
            <div v-if="shouldHaveOptions()" class="mt-2">
                <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                    Option

                 <Button type="button" color="gray" @click="addOption()">
                    <PlusIcon class="h-4 w-4 mr-1"/>
                    <span class="text-xs">Add Option</span>
                </Button>

                </h4>
                <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                    You don't have any options defines
                </div>

                <!-- Option List -->
                <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
                    <span class="w-6 text-sm">
                        {{ index + 1 }}
                    </span>
                    <Input
                        type="text"
                        v-model="option.text"
                        @change="dataChange"
                        class="w-full"
                    />
                    <Button type="button" color="outline" @click="removeOption(option)">
                        <TrashIcon class="h-4 w-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>

  <hr class="my-8" />
</template>

<script setup>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "../../store";
import { TrashIcon, PlusIcon } from "@heroicons/vue/solid";
import Button from "../button/Button.vue";
import Label from "../core/Label.vue";
import Input from "../core/Input.vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

const model = ref(JSON.parse(JSON.stringify(props.question)));

const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const shouldHaveOptions = () => {
    return ["select", "radio", "checkbox"].includes(model.value.type); 
}

const getOptions = () => {
    return model.value.data.options;
}

const setOptions = (options) => {
    model.value.data.options = options;
}

const addOption = () => {
    setOptions([
        ...getOptions(),
        {uuid: uuidv4(), text: ""},
    ]);
    dataChange();
}

const removeOption = (op) => {
    setOptions(getOptions().filter((opt) => opt !== op ));
    dataChange();
}

const typeChange = () => {
    if (shouldHaveOptions()){
        setOptions(getOptions()|| []);
    }
    dataChange();
}

const dataChange = () => {
    const data = JSON.parse(JSON.stringify(model.value))
    if (!shouldHaveOptions()){
        delete data.data.options;
    }
    emit("change", data)
}

 const addQuestion = () => {
  emit("addQuestion", props.index + 1);
 }

 const deleteQuestion = () => {
  emit("deleteQuestion", props.question);
 }

</script>

<style lang="scss" scoped></style>
