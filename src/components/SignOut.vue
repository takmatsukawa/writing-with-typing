<template>
  <a href="#" class="block px-8 py-4" @click.prevent="signout">SIGN OUT</a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "aws-amplify";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const signout = async () => {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log("error signing out: ", error);
      }
      router.push({ name: "login" });
    };

    return { signout };
  },
});
</script>
