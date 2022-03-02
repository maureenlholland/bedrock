/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import App from './App.svelte';

const svelteApp = document.getElementById('svelte-app');

const app = new App({
    target: svelteApp,
    props: {
        headerType: svelteApp.dataset.headerType,
        formUrl: svelteApp.dataset.formUrl,
        user: JSON.parse(svelteApp.dataset.user),
        newsletters: JSON.parse(svelteApp.dataset.newsletters),
        ftlSubscribe: svelteApp.dataset.ftlSubscribe
    }
});

export default app;
