/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Header from '../../components/Header.svelte';

const target = document.getElementById('svelte-newsletter-header');

const app = new Header({
    target: target,
    props: {
        headerType: target.dataset.headerType
    }
});

export default app;
