import { createRouter, createWebHistory } from "vue-router";
import Index from "./components/Index.vue";
import TrainingRoom from "./components/TrainingRoom.vue";

const base = "/writing-with-typing";
const routes = [
  { path: base + "/", component: Index, name: "index" },
  {
    path: base + "/training/:id",
    component: TrainingRoom,
    name: "training-room",
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
