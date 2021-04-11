<template>
  <main>
    <h1 class="text-4xl">Writing Training for English Learner</h1>
    <div
      class="flex mt-8 flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"
    >
      <p v-if="!packages.length" class="text-gray-800">There is no package!</p>
      <router-link
        v-for="pack in packages"
        :key="pack.id"
        :to="{ name: 'training-room', params: { id: pack.id } }"
        class="border block px-8 py-5 rounded hover:border-gray-300"
        >{{ pack.title }} ({{ pack.textSets.length }})</router-link
      >
    </div>
  </main>
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
