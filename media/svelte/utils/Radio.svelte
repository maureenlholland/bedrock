<script>
    export let legend;
    export let choices;
    export let chosen;
</script>

<fieldset>
    <legend>{legend}</legend>

    {#each choices as { label, value }, i}
        <label for="radio-{i}" class="mzp-u-inline">
            <input type="radio" bind:group={chosen} {value} />
            {label}
        </label>
    {/each}
</fieldset>
