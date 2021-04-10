<template>
  <h1 class="text-2xl uppercase">{{ title }}</h1>
  <section v-for="(textSet, i) in texts" :key="textSet.id" class="mt-5">
    <answer-text :answer="textSet.target" :input="inputs[i]"></answer-text>
    <p class="text-gray-800 mt-5">{{ textSet.native }}</p>
    <textarea
      v-model="inputs[i]"
      class="mt-2 px-2 py-1 shadow-sm block w-full border border-gray-300 rounded-md focus:outline-none focus:ring sm:text-sm"
    ></textarea>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useTextSets } from "../composables/useTextSets";
import AnswerText from "../components/AnswerText.vue";

export default defineComponent({
  setup() {
    const { packages } = useTextSets();
    const title = computed(() => packages.value[0].title);
    const texts = computed(() => packages.value[0].textSets);
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
