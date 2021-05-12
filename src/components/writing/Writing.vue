<template>
  <section class="relative">
    <answer-text
      :answer="textSet.target"
      :input="input"
      :answerTextOpacity="answerTextOpacity"
    ></answer-text>
    <div v-html="textSet.native" class="text-gray-800 mt-5 prose" />
    <textarea
      :ref="
        (el) => {
          // @ts-ignore
          if (el) textarea = el;
        }
      "
      v-model="input"
      :style="{ height: height }"
      class="mt-2 px-2 py-1 shadow-sm block w-full border border-gray-300 rounded-md focus:outline-none focus:ring sm:text-sm"
    ></textarea>
  </section>
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick } from "vue";
import { TextSet } from "../../composables/useTextSets";
import AnswerText from "./AnswerText.vue";

export default defineComponent({
  props: {
    textSet: {
      required: true,
      type: Object as () => TextSet,
    },
    answerTextOpacity: {
      type: Number as () => 0 | 10,
      default: 10,
    },
  },
  setup() {
    const input = ref("");
    const textarea = ref<Element>();
    const height = ref<string>("auto");

    const resize = () => {
      height.value = "auto";
      nextTick(() => {
        if (!textarea.value) {
          return;
        }
        height.value = textarea.value.scrollHeight + "px";
      });
    };

    watch(input, resize);

    return { input, textarea, height };
  },
  components: {
    AnswerText,
  },
});
</script>

<style scoped></style>
