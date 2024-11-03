import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const useMock = mode === "mock";

    return {
        plugins: [react()],
        define: {
            "import.meta.env.USE_MOCK": JSON.stringify(useMock),
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "/src/setupTests.js",
        },
    };
});
