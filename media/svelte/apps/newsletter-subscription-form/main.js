/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import SubscriptionForm from '../../components/SubscriptionsForm.svelte';

const target = document.getElementById('svelte-newsletter-subscription-form');

const app = new SubscriptionForm({
    target: target,
    props: {
        formUrl: target.dataset.formUrl,
        newsletters: JSON.parse(target.dataset.newsletters),
        ftlSubscribe: target.dataset.ftlSubscribe
    }
});

export default app;
