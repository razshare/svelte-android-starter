import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import path from "path"
import { fileURLToPath } from "url"
const file = fileURLToPath(import.meta.url)
const dir = path.dirname(file).replace(/\\+/, "/")

const IS_DEV = "1" === (process.env.DEV ?? "")

// https://vite.dev/config/
export default defineConfig({
    logLevel: "info",
    root: "./src",
    plugins: [
        svelte({
            compilerOptions: {
                css: "injected",
            },
        }),
    ],
    resolve: {
        alias: {
            $lib: `${path.resolve(dir, "./src/lib")}`,
        },
    },
    build: {
        emptyOutDir: true,
        outDir: "../dist",
        copyPublicDir: false,
        sourcemap: IS_DEV ? "inline" : false,
        rollupOptions: {
            input: {
                index: "./src/index.html",
            },
        },
    },
    server: {
        host: "0.0.0.0",
    },
})
