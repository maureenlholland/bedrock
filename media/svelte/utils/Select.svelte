<script>
    export let label;
    export let options;
    export let selected;

    let name = label.toLowerCase();
</script>

<label for={name}>{label}</label>
<select {name} id={name} value={selected}>
    {#each options as { label, value }}
        <option {value}>{label}</option>
    {/each}
</select>
