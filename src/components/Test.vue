<template>test</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useTextSets } from "../composables/useTextSets";

export default defineComponent({
  setup() {
    const isLoading = ref(true);
    const { packages, getPackages } = useTextSets();

    onMounted(async () => {
      await getPackages();
      isLoading.value = false;
    });

    return { packages, isLoading };
  },
});
</script>
