<script>
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$lib/scripts/href"
</script>

<Layout>
    <span>Welcome to the default view.</span>
    <br />
    <a {...href("Todos")}>Click me</a> to navigate away.
</Layout>
