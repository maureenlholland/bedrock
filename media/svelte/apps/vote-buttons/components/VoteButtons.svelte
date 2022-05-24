<script>
    // imports
    import VoteFeedback from './VoteFeedback.svelte';
    import ThumbsUp from './icons/ThumbsUp.svelte';
    import ThumbsDown from './icons/ThumbsDown.svelte';

    // set variables
    let vote = null;
    export let heading;
    export let button1;
    export let button2;
    export let article;

    // set functions
    function handleClick(e) {
        //   set vote styles
        vote = e.target.name;
        //  send to GA
        window.dataLayer.push({
            event: 'vpn-article-vote',
            label: article,
            value: vote
        });
    }
</script>

<div class="mzp-l-content" class:has-voted={vote}>
    <h3>{heading}</h3>
    {#if vote}
        <VoteFeedback {vote}>
            {#if vote === 'helpful'}
                <ThumbsUp />
            {:else}
                <ThumbsDown />
            {/if}
        </VoteFeedback>
    {:else}
        <button
            type="button"
            name="helpful"
            on:click={(e) => handleClick(e)}
            aria-pressed={vote === 'helpful'}
        >
            <span>{button1}</span>
            <ThumbsUp />
        </button>
        <button
            type="button"
            name="not helpful"
            on:click={(e) => handleClick(e)}
            aria-pressed={vote === 'not helpful'}
        >
            <span>{button2}</span>
            <ThumbsDown />
        </button>
    {/if}
</div>

<style lang="scss">
    div {
        text-align: center;
    }

    button {
        background: transparent;
        border: none;
        color: $color-moz-dark-gray;
        cursor: pointer;
        fill: currentColor;
        height: $layout-sm + 6px;
        width: $layout-md - 6px;
        margin-right: $spacing-xs;
        margin-left: $spacing-xs;

        &:last-of-type {
            position: relative;
            top: 13px;
        }
        span {
            @include visually-hidden;
        }
    }
</style>
