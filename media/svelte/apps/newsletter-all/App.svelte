<script>
    import Header from '../../components/Header.svelte';
    import SubscriptionsForm from '../../components/SubscriptionsForm.svelte';
    import BasicSettings from '../../components/BasicSettings.svelte';

    export let headerType;
    export let formUrl;
    export let user;
    export let newsletters;
    export let ftlSubscribe;
</script>

<main>
    <Header {headerType} />
    <div class="mzp-l-content">
        <form
            method="post"
            action={formUrl}
            id="existing-newsletter-form"
            class="mzp-c-form"
        >
            <div class="c-column">
                <div class="c-column-content" id="basic-settings">
                    <BasicSettings {user} />
                    <aside>
                        <!-- <p>{{ ftl('newsletters-many-of-our-communications', url='https://support.mozilla.org/kb/managing-account-data') }}</p>

                <p>{{ ftl('newsletters-to-get-access-to-the-whole', url=url('firefox.accounts')) }}</p>

                <p>{{ ftl('newsletters-there-are-many-ways-to', url=url('mozorg.about.forums.forums')) }}</p> -->
                    </aside>
                </div>
            </div>
            <div class="c-column">
                <div class="c-column-content">
                    <SubscriptionsForm {newsletters} {ftlSubscribe} />
                    <input
                        type="submit"
                        value="Save Preferences"
                        class="mzp-c-button"
                    />
                </div>
            </div>
        </form>
    </div>
</main>

<style>
</style>
