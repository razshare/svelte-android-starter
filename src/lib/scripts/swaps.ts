import { uuid } from "$lib/scripts/uuid"
import type { View } from "$lib/types/View"
import type { ViewName } from "$lib/types/ViewName"

type SwapAction = {
    withData: (data: Record<string, unknown>) => SwapAction
    withView: (name: ViewName) => SwapAction
    position: () => number
    play: (update: boolean) => Promise<void>
}

let nextPosition = 0
const record = {} as Record<string, SwapAction>

function find(id: string): false | SwapAction {
    return record[id] ?? false
}

function swap(view: View<unknown>): SwapAction {
    let swapData = view.data
    let swapViewName: ViewName = view.name
    const swapPosition = nextPosition++

    return {
        withData(data: Record<string, unknown>): SwapAction {
            swapData = data
            return this
        },
        withView(viewName: ViewName): SwapAction {
            swapViewName = viewName
            return this
        },
        position(): number {
            return swapPosition
        },

        async play(update: boolean): Promise<void> {
            view.data = swapData
            view.name = swapViewName

            if (update) {
                const id = uuid()
                record[id] = this
                window.history.pushState(id, "", `${String(swapViewName)}`)
            }
        },
    }
}

function position(): number {
    return nextPosition
}

function teleport(position: number) {
    nextPosition = position
}

export const swaps = {
    swap,
    find,
    position,
    teleport,
}
