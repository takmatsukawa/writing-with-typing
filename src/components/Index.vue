<template>
  <div class="pb-10">
    <header
      class="bg-green-600 border-b flex justify-between p-5 md:p-0 md:bg-gray-50"
    >
      <span
        class="flex items-center bg-green-600 text-white md:px-8 md:py-4 md:inline-flex"
      >
        <alphabetical-variant-icon
          class="inline-block mr-2 transform -skew-y-6"
          decorative
        />
        <span class="font-semibold md:text-xl">
          Writing Training for English Learner
        </span>
      </span>
      <signout
        class="block text-white text-sm mr-2 md:mr-0 md:text-base md:text-black md:px-8 md:py-4"
      />
    </header>
    <main class="max-w-prose mx-5 mt-10 md:mt-16 md:mx-auto">
      <template v-if="!isLoading">
        <p v-if="!packages.length" class="text-gray-800">
          There is no package!
        </p>

        <router-link
          class="hidden bg-gray-600 text-white text-center w-full rounded py-4 text-lg hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50"
          :to="{ name: 'test' }"
          >Start Test</router-link
        >

        <div class="mt-10 grid gap-1 md:grid-cols-3 md:gap-4">
          <router-link
            v-for="pack in packages"
            :key="pack.id"
            :to="{ name: 'training-room', params: { id: pack.id } }"
            class="block rounded hover:border-gray-300 text-lg font-semibold text-gray-700"
          >
            <img
              v-if="pack.image"
              class="rounded-sm"
              :src="`${pack.image.url}?fit=crop&w=200&h=135`"
              :alt="pack.title"
              width="200"
              height="200"
              loading="lazy"
            />
            <span class="block px-3 py-3">
              {{ pack.title }}
              <span class="block text-gray-600 text-xs font-light mt-2">
                {{ pack.textSets.length }} sentenses
              </span>
            </span>
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
