import { getContext } from "svelte"
import type { View } from "$lib/types/view"
import { route } from "$lib/scripts/route.ts"
import { swaps } from "$lib/scripts/swaps.ts"

export function href(viewName = ""): {
    href: string
    onclick: (mouseEvent: MouseEvent) => void
} {
    const view = getContext("view") as View<unknown>
    route(view)
    return {
        href: "#",
        async onclick(mouseEvent: MouseEvent) {
            mouseEvent.preventDefault()
            await swaps.swap(view).withName(viewName).play(true)
            return false
        },
    }
}
