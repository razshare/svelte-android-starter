import { getContext } from "svelte"
import { swaps } from "$lib/scripts/swaps"
import type { View } from "$lib/types/view"
import { route } from "$lib/scripts/route"

export async function navigate(
    viewName: string,
    data: Record<string, any> = {},
): Promise<void> {
    const view = getContext("view") as View<never>
    route(view)
    await swaps.swap(view).withName(viewName).withData(data).play(true)
}
