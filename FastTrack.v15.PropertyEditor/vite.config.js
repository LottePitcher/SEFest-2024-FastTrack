import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: ["src/property-editor-ui.ts"], // Files to compile and bundle
            formats: ["es"]
        },
        outDir: '../FastTrack.v15/App_Plugins/FastTrackMemberExpire', // The output directory
        rollupOptions: {
            external: [/^@umbraco/],
        },
    }
});