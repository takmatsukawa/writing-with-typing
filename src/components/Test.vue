<template>
  <main class="max-w-prose mx-5 pt-10 pb-80 md:mx-auto">
    <router-link :to="{ name: 'index' }" class="text-blue-600 underline"
      >Back to index</router-link
    >
    <div v-if="!loaded" class="mt-5">Now loading...</div>
    <div v-else-if="test" class="mt-5">
      <writing :textSet="test.textSet" :answerTextOpacity="0" />
      <div class="mt-8 flex justify-end gap-3">
        <button
          type="button"
          class="button button--red flex-1"
          @click="choseHard"
        >
          Hard
        </button>
        <button
          type="button"
          class="button button--green flex-1"
          @click="choseEasy"
        >
          Easy
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useTests, Test } from "../composables/useTests";
import Writing from "./writing/Writing.vue";

export default defineComponent({
  setup() {
    const { loaded, getTest } = useTests();
    const test = ref<Test>();

    watch(loaded, () => {
      if (loaded.value) {
        test.value = getTest();
      }
    });

    const choseEasy = () => {
      test.value = getTest();
    };

    const choseHard = () => {
      test.value = getTest();
    };

    return { loaded, test, choseEasy, choseHard };
  },
  components: { Writing },
});
</script>
