import type { View } from "$lib/types/view"
import { uuid } from "$lib/scripts/uuid.ts"

type SwapAction = {
    withData: (data: Record<string, any>) => SwapAction
    withName: (name: string) => SwapAction
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
    let swapName = view.name
    const swapPosition = nextPosition++

    return {
        withData(data): SwapAction {
            swapData = data
            return this
        },
        withName(name): SwapAction {
            swapName = name
            return this
        },
        position(): number {
            return swapPosition
        },

        async play(update: boolean): Promise<void> {
            view.data = swapData
            view.name = swapName

            if (update) {
                const id = uuid()
                record[id] = this
                window.history.pushState(id, "", swapName)
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
