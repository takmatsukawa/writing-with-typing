import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import CheckCircleIcon from "vue3-material-design-icons/CheckCircle.vue";

const app = createApp(App);

app.component("CheckCircleIcon", CheckCircleIcon);

app.mount("#app");
