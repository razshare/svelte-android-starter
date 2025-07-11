export function on(
    event: keyof DocumentEventMap,
    callback: (event: Event) => void | Promise<void>,
): () => void {
    const app = document.getElementById("app")
    if (!app) {
        return function destroy() {}
    }

    app.addEventListener(event, callback)

    return function destroy() {
        document.removeEventListener(event, callback)
    }
}
