<script>
    import PlaceholderHeading from './PlaceholderHeading.svelte';
    import SignedOutHeading from './SignedOutHeading.svelte';
    import SignedInHeading from './SignedInHeading.svelte';
    import NotFirefoxHeading from './NotFirefoxHeading.svelte';

    const contentOptions = [
        { format: 'placeholder', component: PlaceholderHeading },
        { format: 'signed-out', component: SignedOutHeading },
        { format: 'signed-in', component: SignedInHeading },
        { format: 'not-firefox', component: NotFirefoxHeading }
    ];

    let userState = 'placeholder';

    // svelte has an onMount function stuff like this might live, runtime only: https://svelte.dev/docs#run-time-svelte-onmount
    window.Mozilla.Client.getFxaDetails(getFxaState);

    function getFxaState(details) {
        console.log(details)
        if (details.firefox && details.setup) {
            userState = 'signed-in';
        } else if (details.firefox) {
            userState = 'signed-out';
        } else {
            userState = 'not-firefox';
        }
    }

    // $ means this will be reactive to the change in userState (or any other variable used in the assignment)
    $: component = contentOptions.find(
        (type) => type.format == userState
    ).component;
</script>

<header class="mzp-l-content mzp-t-content-lg">
    <div>
        <button on:click={() => (userState = 'signed-in')}>Signed-in</button>
        <button on:click={() => (userState = 'signed-out')}>Signed-out</button>
        <button on:click={() => (userState = 'not-firefox')}>Not Firefox</button
        >
    </div>
    <svelte:component this={component} />
</header>

<style lang="scss">
    header {
        background-color: $color-white;
    }

    div:first-of-type {
        margin-bottom: $spacing-xl;
    }
</style>
