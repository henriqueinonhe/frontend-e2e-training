import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
  test: {
    include: ["**/*.test.*"],
    setupFiles: "src/utils/testing/setup.ts",
    environment: "jsdom",
  },
});
