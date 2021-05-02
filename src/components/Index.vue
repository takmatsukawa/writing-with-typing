<template>
  <div class="pb-10">
    <header class="bg-gray-50 border-b flex justify-between">
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
      <signout />
    </header>
    <main class="max-w-prose mx-5 mt-10 md:mt-16 md:mx-auto">
      <template v-if="!isLoading">
        <p v-if="!packages.length" class="text-gray-800">
          There is no package!
        </p>
        <div class="grid gap-1 md:grid-cols-3 md:gap-4">
          <router-link
            v-for="pack in packages"
            :key="pack.id"
            :to="{ name: 'training-room', params: { id: pack.id } }"
            class="border inline-block px-5 py-5 rounded hover:border-gray-300 text-lg font-semibold text-gray-700"
          >
            {{ pack.title }}
            <img
              v-if="pack.image"
              class="mt-3 rounded-sm"
              :src="`${pack.image.url}?fit=crop&w=200&h=135`"
              :alt="pack.title"
              width="200"
              height="200"
            />
            <p class="text-gray-600 text-xs font-light mt-2">
              {{ pack.textSets.length }} sentenses
            </p>
          </router-link>
        </div>
      </template>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Signout from "./SignOut.vue";
import { useTextSets } from "../composables/useTextSets";

export default defineComponent({
  setup() {
    const isLoading = ref(true);
    const { packages, getPackages } = useTextSets();
    const sorted = computed(() =>
      packages.value.sort((a, b) =>
        a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      )
    );

    onMounted(async () => {
      await getPackages();
      isLoading.value = false;
    });

    return { packages: sorted, isLoading };
  },
  components: { Signout },
});
</script>
