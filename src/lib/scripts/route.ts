import type { View } from "$lib/types/view"
import { swaps } from "$lib/scripts/swaps.ts"

let started = false

export function route(view: View<unknown>): void {
    if (started) {
        return
    }

    const listener = async function pop(e: PopStateEvent) {
        e.preventDefault()

        const id = e.state ?? ""
        const current = swaps.find(id)

        if (!current) {
            await swaps.swap(view).withName("Default").play(false)
            return
        }

        if (current.position() + 1 != swaps.position()) {
            swaps.teleport(current.position() + 1)
            await current.play(false)
        } else {
            await current.play(true)
        }
    }
    window.addEventListener("popstate", listener)
    started = true
}
