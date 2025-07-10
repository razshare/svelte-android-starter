<script>
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$lib/scripts/href.ts"
</script>

<Layout>
    <span>Welcome to the default view.</span>
    <a {...href()}>Click me to navigate away</a>
</Layout>
