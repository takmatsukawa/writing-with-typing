<template>
  <main class="max-w-prose mx-5 pt-10 pb-80 md:mx-auto">
    <router-link :to="{ name: 'index' }" class="text-blue-600 underline"
      >Back to index</router-link
    >
    <template v-if="pack">
      <h1 class="mt-2 text-3xl text-gray-700">{{ pack.title }}</h1>
      <div class="mt-5 space-y-10">
        <p v-if="!pack.textSets.length" class="text-gray-800">
          This package is empty.
        </p>
        <section
          v-for="(textSet, i) in pack.textSets"
          :key="textSet.id"
          class="relative"
        >
          <span
            v-if="textSet.confident"
            class="hidden bg-red-500 text-white text-xs px-1 rounded-sm font-semibold absolute md:inline"
            style="margin-top: 5px; margin-left: -100px"
            >Confident!</span
          >
          <span
            v-if="textSet.confident"
            class="inline-block mb-2 bg-red-500 text-white text-xs px-1 rounded-sm font-semibold md:hidden"
            >Confident!</span
          >

          <answer-text
            :answer="textSet.target"
            :input="inputs[i] ? inputs[i] : ''"
          ></answer-text>
          <div v-html="textSet.native" class="text-gray-800 mt-5 prose" />
          <textarea
            :ref="
              (el) => {
                // @ts-ignore
                if (el) textareas[i] = el;
              }
            "
            v-model="inputs[i]"
            :style="{ height: heights[i] }"
            class="mt-2 px-2 py-1 shadow-sm block w-full border border-gray-300 rounded-md focus:outline-none focus:ring sm:text-sm"
          ></textarea>
        </section>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, onMounted } from "vue";
import { useTextSets } from "../composables/useTextSets";
import AnswerText from "../components/AnswerText.vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup({ id }) {
    const { packages, getPackages } = useTextSets();
    onMounted(getPackages);
    const pack = computed(() => packages.value.find((pack) => pack.id == id));

    const inputs = ref<string[]>([]);

    const textareas = ref<Element[]>([]);
    const heights = ref<string[]>([]);

    const resize = () => {
      textareas.value.forEach((textarea, i) => {
        heights.value[i] = "auto";
        nextTick(() => {
          heights.value[i] = textarea.scrollHeight + "px";
        });
      });
    };

    return {
      pack,
      inputs,
      heights,
      textareas,
      resize,
    };
  },
  watch: {
    inputs: {
      handler(val) {
        this.resize();
      },
      deep: true,
    },
  },
  components: {
    AnswerText,
  },
});
</script>

<style scoped>
h1 {
  font-family: Montserrat, sans-serif;
}
</style>
