<script>
    import Select from '../utils/Select.svelte';
    import Radio from '../utils/Radio.svelte';
    export let user;

    const { country, lang, format, email } = user;
</script>

<label>Your email</label>
<p>{email}</p>

<Select
    label="Country"
    options={[
        { label: 'Canada', value: 'ca' },
        { label: 'America', value: 'us' }
    ]}
    selected={country}
/>

<label for="lang">Lang</label>
<select name="lang" id="lang" value={lang}>
    <option value="fr">French</option>
    <option value="en">English</option>
</select>

<Radio
    legend="Format"
    choices={[
        { label: 'HTML', value: 'H' },
        { label: 'Text', value: 'T' }
    ]}
    chosen={format}
/>
