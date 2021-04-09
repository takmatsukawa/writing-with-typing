<template>
  <div class="px-5 py-10">
    <h1 class="text-2xl uppercase">{{ title }}</h1>
    <section v-for="(textSet, i) in texts" :key="textSet.id" class="mt-5">
      <p>
        <template v-for="(word, j) in wordList[i]" :key="j">
          <span :class="wordState(i, j)">{{ word }}</span
          >&nbsp;
        </template>

        <check-circle
          v-if="complete(i)"
          class="inline-block text-green-600"
          title="clear"
          :size="15"
          decorative
        />
      </p>
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

export default defineComponent({
  name: "App",
  setup() {
    const { title, texts } = useTextSets();
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

    const someOfItIsCorrect = (i: number, j: number) =>
      isMismatch(i, j) &&
      wordList.value[i][j].includes(inputWordList.value[i][j]);

    const notYetInput = (i: number, j: number) =>
      !wordList.value[i] ||
      !inputWordList.value[i] ||
      !wordList.value[i][j] ||
      !inputWordList.value[i][j] ||
      !wordList.value[i][j].length ||
      !inputWordList.value[i][j].length;

    const wordState = (i: number, j: number) => ({
      "text-green-600": isMatch(i, j),
      "text-red-600": isMismatch(i, j),
      underline: isMismatch(i, j) && !someOfItIsCorrect(i, j),
      "text-black": true,
      "text-opacity-10":
        notYetInput(i, j) || (!isMatch(i, j) && someOfItIsCorrect(i, j)),
    });

    const complete = (i: number) => texts.value[i].target === inputs.value[i];

    return {
      title,
      texts,
      inputs,
      wordList,
      inputWordList,
      wordState,
      complete,
    };
  },
});
</script>

<style></style>
