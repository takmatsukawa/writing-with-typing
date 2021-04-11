import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import yaml from "@rollup/plugin-yaml";

export default defineConfig({
  base: "/writing-with-typing/",
  plugins: [vue(), yaml()],
});
