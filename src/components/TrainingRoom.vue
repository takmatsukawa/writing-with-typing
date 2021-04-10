<template>
  <router-link :to="{ name: 'index' }" class="text-blue-600 underline"
    >Back to index</router-link
  >
  <h1 class="text-2xl uppercase">{{ title }}</h1>
  <div class="mt-5 space-y-10">
    <section v-for="(textSet, i) in texts" :key="textSet.id">
      <answer-text :answer="textSet.target" :input="inputs[i]"></answer-text>
      <markdown :source="textSet.native" class="text-gray-800 mt-5 prose" />
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

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import { useTextSets } from "../composables/useTextSets";
import AnswerText from "../components/AnswerText.vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    const { packages } = useTextSets();
    if (packages.value.find((pack) => pack.id == to.params.id)) {
      next();
    } else {
      next({ name: "index" });
    }
  },
  setup({ id }) {
    const { packages } = useTextSets();
    const pack = computed(() => packages.value.find((pack) => pack.id == id));

    const inputs = ref<string[]>(
      pack.value ? pack.value.textSets.map(() => "") : []
    );

    const textareas = ref<Element[]>([]);
    const heights = ref<string[]>(
      pack.value ? pack.value.textSets.map(() => "auto") : []
    );

    const resize = () => {
      textareas.value.forEach((textarea, i) => {
        heights.value[i] = "auto";
        nextTick(() => {
          heights.value[i] = textarea.scrollHeight + "px";
        });
      });
    };

    return {
      title: pack.value?.title,
      texts: pack.value?.textSets,
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

<style scoped></style>
