import { getContext } from "svelte"
import { route } from "$lib/scripts/route"
import { swaps } from "$lib/scripts/swaps"
import type { ViewName } from "$lib/types/ViewName"
import type { View } from "$lib/types/View"

export async function navigate(
    view: ViewName,
    data: Record<string, unknown> = {},
) {
    const viewReference = getContext("view") as View<unknown>
    route(viewReference)
    return swaps.swap(viewReference).withView(view).withData(data).play(true)
}
