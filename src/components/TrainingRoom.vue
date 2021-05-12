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
        <writing
          v-for="textSet in pack.textSets"
          :key="textSet.id"
          :textSet="textSet"
        />
      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, onMounted } from "vue";
import { useTextSets } from "../composables/useTextSets";
import Writing from "./writing/Writing.vue";

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

    return {
      pack,
    };
  },
  components: { Writing },
});
</script>

<style scoped>
h1 {
  font-family: Montserrat, sans-serif;
}
</style>
