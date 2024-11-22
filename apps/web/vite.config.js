import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "src"
        ),
      },
    ],
  },
});
