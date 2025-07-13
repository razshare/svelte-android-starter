import { globalIgnores } from "eslint/config"
import prettier from "eslint-config-prettier"
import js from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import { fileURLToPath } from "node:url"
import ts from "typescript-eslint"
import svelteConfig from "./svelte.config.js"

export default ts.config(
    includeIgnoreFile(fileURLToPath(new URL("./.gitignore", import.meta.url))),
    globalIgnores(["android/*"]),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...{
                    NodeJS: true,
                },
            },
        },
        rules: {
            "@typescript-eslint/ban-ts-comment": "off",
            "func-names": ["error", "always"],
            /**
             * Remember to set "eslint.validate": ["javascript", "svelte"] in settings.json.
             */
            // @see https://astexplorer.net/
            "no-restricted-syntax": [
                "error",
                {
                    selector: "ArrowFunctionExpression",
                    message: "Shorthand arrow functions are not allowed.",
                },
                {
                    selector: "ClassDeclaration",
                    message:
                        "Classes are not allowed, use object literals instead.",
                },
            ],
        },
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                svelteConfig,
            },
        },
    },
)
