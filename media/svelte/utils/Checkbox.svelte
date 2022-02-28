<script>
    export let legend;
    export let choices;
    export let chosen;
</script>

<fieldset>
    <legend>{legend}</legend>

    {#each choices as { label, value }, i}
        <label for="checkbox-{i}" class="mzp-u-inline">
            <!-- 'type' attribute cannot be dynamic if input uses two-way bindingsvelte(invalid-type) -->
            <input type="checkbox" bind:group={chosen} {value} />
            {label}
        </label>
    {/each}
</fieldset>
