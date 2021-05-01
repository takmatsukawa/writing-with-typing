import { createRouter, createWebHashHistory } from "vue-router";
import Index from "./components/Index.vue";
import TrainingRoom from "./components/TrainingRoom.vue";

const base = "";
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
  history: createWebHashHistory(),
  routes,
});
