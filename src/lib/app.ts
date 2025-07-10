import { App } from "@capacitor/app"
import { mount } from "svelte"
import Router from "$lib/components/Router.svelte"
import { views } from "$lib/views"

const view = { name: location.pathname.substring(1) ?? "" }
const exists = view.name in views

if (!exists) {
    view.name = "Default"
}

////////////////////////////////////////////////
// This is required only in development mode. //
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
// When using HMR only parts of the application
// actually reload, so there's a chance that
// this file reloads and registers duplicate
// listeners, thus we need to clean them up.
App.removeAllListeners()
App.addListener("backButton", function back() {
    history.back()
})
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

mount(Router, {
    target: document.getElementById("app") as HTMLElement,
    // @ts-ignore
    props: view,
})
