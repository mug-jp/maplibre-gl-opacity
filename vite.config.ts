import { defineConfig } from 'vitest/config';

export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: true,
        lib: {
            entry: 'src/maplibre-gl-opacity.ts',
            name: 'OpacityControl',
            fileName: 'maplibre-gl-opacity',
        },
        rollupOptions: {
            external: ['maplibre-gl'],
            output: {
                globals: {
                    'maplibre-gl': 'maplibregl',
                },
            },
        },
    },
    test: {
        browser: {
            provider: 'playwright', // or 'webdriverio'
            enabled: true,
            name: 'chromium', // browser name is required
            headless: true,
        },
    },
});
