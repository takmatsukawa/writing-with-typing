<template>
  <div class="px-5 py-10">
    <h1 class="text-2xl uppercase">Blog introductions</h1>
    <section v-for="(textSet, i) in texts" :key="textSet.id" class="mt-5">
      <p>
        <span
          v-for="(word, j) in wordList[i]"
          :key="j"
          :class="wordState(i, j)"
        >
          {{ word }}&nbsp;
        </span>
      </p>
      <p class="text-gray-800 mt-5">{{ textSet.native }}</p>
      <textarea
        v-model="inputs[i]"
        class="px-2 py-1 shadow-sm mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring sm:text-sm"
      ></textarea>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTextSets } from "./composables/useTextSets";

export default defineComponent({
  name: "App",
  setup() {
    const { texts } = useTextSets();
    const wordList = computed(() =>
      texts.value.map((textSet) => textSet.target.split(" "))
    );
    const inputs = ref<string[]>([]);
    const inputWordList = computed(() =>
      inputs.value.map((text) => text.split(" "))
    );

    const isMatch = (i: number, j: number) =>
      wordList.value[i] &&
      inputWordList.value[i] &&
      wordList.value[i][j] === inputWordList.value[i][j];

    const isMismatch = (i: number, j: number) =>
      wordList.value[i] &&
      inputWordList.value[i] &&
      wordList.value[i][j] &&
      inputWordList.value[i][j] &&
      wordList.value[i][j].length &&
      inputWordList.value[i][j].length &&
      wordList.value[i][j] !== inputWordList.value[i][j];

    const wordState = (i: number, j: number) => ({
      "text-green-600": isMatch(i, j),
      "text-red-600": isMismatch(i, j),
      "text-black": true,
      "text-opacity-10": !isMatch(i, j),
    });

    return { texts, inputs, wordList, inputWordList, isMatch, wordState };
  },
});
</script>

<style></style>
