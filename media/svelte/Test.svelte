<script>
    let current;

	export let heading;
    export let button1;
    export let button2;

    function handleClick(e) {
		//  send to GA
        current = e.target.name;
	}
</script>

<section>
	<h2>{heading}</h2>
	<button
        name="button1"
        on:click="{e => handleClick(e)}"
        class:selected="{current === 'button1'}"
    >
        {button1}
    </button>
    <button
        name="button2"
        on:click="{e => handleClick(e)}"
        class:selected="{current === 'button2'}"
    >
        {button2}
    </button>
</section>

<style>
    .selected {
        background-color: aquamarine;
        color: white;
    }
</style>
