<template>
  <main>
    <h1 class="text-2xl">Writing training for English learner</h1>
    <div class="flex mt-8 space-x-4">
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
