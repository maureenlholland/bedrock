/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import BasicSettings from '../../components/BasicSettings.svelte';

const target = document.getElementById('svelte-newsletter-basic-settings');

const app = new BasicSettings({
    target: target,
    props: {
        formUrl: target.dataset.formUrl,
        user: JSON.parse(target.dataset.user)
    }
});

export default app;
