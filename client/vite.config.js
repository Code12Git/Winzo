import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit as needed
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Example manual chunking based on specific modules
					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
			},
		},
	},
});
