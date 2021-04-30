<template>
  <div class="pb-10">
    <header class="bg-gray-50 border-b">
      <span
        class="flex items-center bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 md:inline-flex"
      >
        <alphabetical-variant-icon
          class="inline-block mr-2 transform -skew-y-6"
          decorative
        />
        <span class="font-semibold md:text-xl">
          Writing Training for English Learner
        </span>
      </span>
    </header>
    <main class="max-w-prose mx-5 mt-10 md:mt-16 md:mx-auto">
      <p v-if="!packages.length" class="text-gray-800">There is no package!</p>
      <div class="grid gap-1 md:grid-cols-3 md:gap-4">
        <router-link
          v-for="pack in packages"
          :key="pack.id"
          :to="{ name: 'training-room', params: { id: pack.id } }"
          class="border inline-block px-8 py-5 rounded hover:border-gray-300"
          >{{ pack.title }} ({{ pack.textSets.length }})</router-link
        >
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useTextSets } from "../composables/useTextSets";

export default defineComponent({
  setup() {
    const { packages, getPackages } = useTextSets();

    onMounted(getPackages);

    return { packages };
  },
});
</script>
