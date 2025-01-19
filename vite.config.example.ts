import { defineConfig } from 'vite';

export default defineConfig({
    root: './example',
    base: './',
    build: {
        outDir: '../demo',
        chunkSizeWarningLimit: 1000,
        emptyOutDir: true,
    },
    plugins: [],
});
