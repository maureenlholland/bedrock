<script>
    export let newsletters;
    export let ftlSubscribe;
</script>

<table>
    <thead>
        <tr>
            <th />
            <th colspan="2">{ftlSubscribe}</th>
        </tr>
    </thead>
    {#each newsletters as { indented, title, description, subscribed_check }}
        <tr class:indented>
            <th>
                <h4>{title}</h4>
                <p>
                    {description}
                </p>
            </th>
            <td>
                <input type="checkbox" checked={subscribed_check} />
            </td>
        </tr>
    {/each}
    <tbody />
</table>
