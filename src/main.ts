import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "./index.css";

import CheckCircleIcon from "vue3-material-design-icons/CheckCircle.vue";

const app = createApp(App);

app.use(router);

app.component("CheckCircleIcon", CheckCircleIcon);

app.mount("#app");
