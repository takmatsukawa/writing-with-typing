import { createRouter, createWebHashHistory } from "vue-router";
import { Auth } from "aws-amplify";
import Login from "./components/Login.vue";
import Index from "./components/Index.vue";
import TrainingRoom from "./components/TrainingRoom.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/",
    component: Index,
    name: "index",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/training/:id",
    component: TrainingRoom,
    name: "training-room",
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let user;
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (e) {}

    if (!user) {
      next({
        name: "login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    let user;
    try {
      user = await Auth.currentAuthenticatedUser();
    } catch (e) {}

    if (!user) {
      next();
    } else {
      next({ name: "index" });
    }
  } else {
    next();
  }
});

export { router };
