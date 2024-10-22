import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: ["src/api-setup.ts", "src/property-editor-ui.ts", "src/dashboard.ts"], // Files to compile and bundle
            formats: ["es"]
        },
        outDir: '../FastTrack.v15/App_Plugins/FastTrackCustomizations', // The output directory
        rollupOptions: {
            external: [/^@umbraco/],
        },
    }
});