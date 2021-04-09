<template>
  <div class="px-5 py-10">
    <h1 class="text-2xl uppercase">{{ title }}</h1>
    <section v-for="(textSet, i) in texts" :key="textSet.id" class="mt-5">
      <answer-text :answer="textSet.target" :input="inputs[i]"></answer-text>
      <p class="text-gray-800 mt-5">{{ textSet.native }}</p>
      <textarea
        v-model="inputs[i]"
        class="mt-2 px-2 py-1 shadow-sm mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring sm:text-sm"
      ></textarea>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTextSets } from "./composables/useTextSets";
import AnswerText from "./components/AnswerText.vue";

export default defineComponent({
  name: "App",
  setup() {
    const { title, texts } = useTextSets();
    const inputs = ref<string[]>(texts.value.map(() => ""));

    return {
      title,
      texts,
      inputs,
    };
  },
  components: {
    AnswerText,
  },
});
</script>

<style scoped></style>
