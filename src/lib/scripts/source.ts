import { type Readable, readable } from "svelte/store"

export function source(path: string) {
    const source = new EventSource(path)

    return {
        select(event: string = "message"): Readable<string> {
            return readable<string>("", function start(set) {
                source.addEventListener(event, function receive(event) {
                    set(event.data)
                })
                return function stop() {
                    source.close()
                }
            })
        },
        selectJson<T>(event: string = "message"): Readable<T> {
            return readable<T>(undefined, function start(set) {
                source.addEventListener(event, function receive(ev) {
                    set(JSON.parse(ev.data))
                })
                return function stop() {
                    source.close()
                }
            })
        },
    }
}
