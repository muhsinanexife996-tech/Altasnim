import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/altasnim/",   // <-- add this line
  plugins: [react()],
});
