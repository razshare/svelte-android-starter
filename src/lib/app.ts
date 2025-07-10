import { mount } from "svelte"
import Router from "$lib/components/Router.svelte"
import { views } from "$lib/views"

const view = { name: location.pathname.substring(1) ?? "" }
const exists = view.name in views

if (!exists) {
    view.name = "Default"
}

mount(Router, {
    target: document.getElementById("app") as HTMLElement,
    // @ts-ignore
    props: view,
})
