import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@consts": "/src/consts",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@data": "/src/data",
      "@features": "/src/features",
      "@context": "/src/context",
      "@utils": "/src/utils",
    },
  },
});
