import { mount } from "svelte"
import Router from "$lib/components/Router.svelte"

mount(Router, {
    target: document.getElementById("app") as HTMLElement,
    // @ts-ignore
    props: { name: "Default" },
})
