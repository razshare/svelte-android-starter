import type { View } from "$lib/types/View"
import { getContext } from "svelte"
import { swaps } from "$lib/scripts/swaps"
import { route } from "$lib/scripts/route"
import type { ViewName } from "$lib/types/ViewName"

export function href(view: ViewName, data: Record<string, unknown> = {}) {
    const viewReference = getContext("view") as View<unknown>
    route(viewReference)
    return {
        href: "#",
        async onclick(mouseEvent: MouseEvent) {
            await swaps
                .swap(viewReference)
                .withView(view)
                .withData(data)
                .play(true)
            mouseEvent.preventDefault()
            return false
        },
    }
}
