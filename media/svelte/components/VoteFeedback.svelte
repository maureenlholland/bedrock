<script>
    export let vote;
</script>

<!-- Note: all these strings would need translation -->
<span class="vote"><slot /></span>
<div class="mzp-c-emphasis-box">
    <h4>Thank you for your response!</h4>
    {#if vote === 'not helpful'}
        <form class="mzp-c-form">
            <label for="textarea" class="mzp-c-field-label">
                Could you let us know how we can improve?
            </label>
            <textarea name="textarea" id="textarea" rows="3" cols="40" />
            <input class="mzp-c-button" type="submit" value="Submit" />
        </form>
    {/if}
</div>

<style lang="scss">
    @import 'node_modules/@mozilla-protocol/core/protocol/css/components/emphasis-box';

    .vote {
        color: $color-blue-50;
        fill: currentColor;
    }

    .mzp-c-emphasis-box {
        margin-top: $spacing-lg;
    }

    h4 {
        margin-bottom: 0;
    }

    label {
        margin-top: $spacing-md;
    }
</style>
