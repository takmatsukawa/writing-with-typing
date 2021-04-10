<template>
  <div class="px-5 py-10">
    <training-room />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TrainingRoom from "./components/TrainingRoom.vue";

export default defineComponent({
  name: "App",
  setup() {},
  components: {
    TrainingRoom,
  },
});
</script>

<style scoped></style>
