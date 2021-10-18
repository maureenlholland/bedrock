<script>
    import Heading from '../../shared/Heading.svelte';
    import Button from '../../shared/Button.svelte';
    import Message from './Message.svelte';

    let vote;

	export let heading;
    export let button1;
    export let button2;

    function handleClick(e) {
        if (vote) return;
		//  send to GA
        vote = e.target.name;
	}
</script>

<Heading text={heading} />
<Button
    name="button1"
    text="{button1}"
    clickHandler="{e => handleClick(e)}"
    selected="{vote === 'button1'}"
    disabled={!!vote}
/>
<Button
    name="button2"
    text="{button2}"
    clickHandler="{e => handleClick(e)}"
    selected="{vote === 'button2'}"
    disabled={!!vote}
/>
{#if vote}
    <Message text="Thank you for voting!" />
{/if}
