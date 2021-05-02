<template>
  <main class="max-w-prose mx-5 mt-10 md:mt-16 md:mx-auto">
    <h1 class="text-4xl">Writing Training for English Learner</h1>
    <h3 class="text-xl mt-10">Sign-in</h3>
    <form method="post" class="mt-3" @submit.prevent="submit">
      <template v-if="!newPasswordRequired">
        <label for="email">E-Mail Address</label>
        <div>
          <input
            id="email"
            type="email"
            class="border"
            v-model="email"
            required
            autofocus
          />
        </div>
        <div>
          <label for="password">Password</label>
          <div>
            <input
              id="password"
              type="password"
              class="border"
              v-model="password"
              required
            />
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="underline">Login</button>
        </div>
      </template>
      <template v-else>
        <p>You need to change your password.</p>
        <div>
          <label for="password">New Password</label>
          <div>
            <input
              id="password"
              type="password"
              class="border"
              v-model="newPassword"
              required
            />
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="underline">Save Password</button>
        </div>
      </template>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "aws-amplify";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const newPasswordRequired = ref(false);
    const newPassword = ref("");
    const currentUser = ref(null);

    const submit = async () => {
      if (!newPasswordRequired.value) {
        try {
          const user = await Auth.signIn(email.value, password.value);
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            newPasswordRequired.value = true;
            currentUser.value = user;
            return;
          }

          router.push({
            name: "index",
          });
        } catch (error) {
          console.log("error signing in", error);
        }
      } else {
        try {
          await Auth.completeNewPassword(currentUser.value, newPassword.value);
          router.push({
            name: "index",
          });
        } catch (error) {
          console.log("error signing in", error);
        }
      }
    };

    return { email, password, submit, newPassword, newPasswordRequired };
  },
});
</script>
