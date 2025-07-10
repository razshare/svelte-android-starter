<script lang="ts">
    import { SplashScreen } from "@capacitor/splash-screen"
    import { onMount, type Snippet } from "svelte"
    onMount(SplashScreen.hide)
    interface Props {
        children: Snippet
    }

    let { children }: Props = $props()
</script>

{@render children()}
