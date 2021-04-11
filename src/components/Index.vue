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
        <span class="md:text-xl"> Writing Training for English Learner </span>
      </span>
    </header>
    <main
      class="max-w-prose mx-5 md:mx-auto flex mt-16 flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"
    >
      <p v-if="!packages.length" class="text-gray-800">There is no package!</p>
      <router-link
        v-for="pack in packages"
        :key="pack.id"
        :to="{ name: 'training-room', params: { id: pack.id } }"
        class="border block px-8 py-5 rounded hover:border-gray-300"
        >{{ pack.title }} ({{ pack.textSets.length }})</router-link
      >
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTextSets } from "../composables/useTextSets";

export default defineComponent({
  setup() {
    const { packages } = useTextSets();
    return { packages };
  },
});
</script>
