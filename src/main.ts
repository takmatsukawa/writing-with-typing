import { createApp } from "vue";
import { router } from "./router";
import Markdown from "./components/Markdown.vue";
import App from "./App.vue";
import "./index.css";

import CheckCircleIcon from "vue3-material-design-icons/CheckCircle.vue";
import AlphabeticalVariantIcon from "vue3-material-design-icons/AlphabeticalVariant.vue";

const app = createApp(App);

app.use(router);

app.component("Markdown", Markdown);
app.component("CheckCircleIcon", CheckCircleIcon);
app.component("AlphabeticalVariantIcon", AlphabeticalVariantIcon);

app.mount("#app");
