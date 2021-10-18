<script>
	export let name;
    export let text;
    export let clickHandler;
    export let selected;
    export let disabled;
</script>

<button
        name="{name}"
        on:click="{clickHandler}"
        class:mzp-t-product="{selected}"
        aria-pressed="{selected}"
        class="mzp-c-button mzp-t-md"
        disabled={disabled}
    >
        {text}
</button>
