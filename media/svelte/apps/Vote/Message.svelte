<script>
    import { fly } from 'svelte/transition';
    export let text;
</script>

<p in:fly="{{ y: 200, duration: 800 }}">{text}</p>

<style>
    p {
        margin-top: 1.8rem;
    }
</style>
