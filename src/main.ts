import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import CheckCircle from "vue3-material-design-icons/CheckCircle.vue";

const app = createApp(App);

app.component("CheckCircle", CheckCircle);

app.mount("#app");
