<script>
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$lib/scripts/href"
</script>

<Layout>
    <span>Welcome to the default view.</span>
    <a {...href("Todos")}>Click me to navigate away</a>
</Layout>
