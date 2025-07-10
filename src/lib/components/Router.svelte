<script lang="ts">
    import { setContext, type Component } from "svelte"
    import { views } from "$lib/views"
    import ViewLoader from "$lib/components/ViewLoader.svelte"
    import type { View } from "$lib/types/View"
    import { route } from "$lib/scripts/route"
    // @ts-ignore
    const components = views as Record<string, Component>
    let { name, data } = $props() as View<Record<string, unknown>>
    const view = $state({ name, data })
    setContext("view", view)
    route(view)
</script>

{#each Object.keys(components) as key (key)}
    {#if key === view.name}
        <ViewLoader from={components[key]} properties={view.data} />
    {/if}
{/each}
