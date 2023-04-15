import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const _additionalData = `@use './src/assets/scss/abstracts' as *;`;

const additionalData = (content: string) => {
  return `${_additionalData}\n${content}`;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData,
      },
    },

    modules: {
      localsConvention: "camelCaseOnly",
    },
  },

  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
      "@": resolve(__dirname, "src", "components"),
    },

    extensions: [".ts", ".tsx"],
  },
});
