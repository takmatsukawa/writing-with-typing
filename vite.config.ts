import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import yaml from "@rollup/plugin-yaml";
import ViteFonts from "vite-plugin-fonts";

export default defineConfig({
  base: "/writing-with-typing/",
  plugins: [
    vue(),
    yaml(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Montserrat",
            styles: "wght@700",
          },
        ],
      },
    }),
  ],
});
