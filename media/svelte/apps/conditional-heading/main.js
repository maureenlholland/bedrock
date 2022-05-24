/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import ConditionalHeading from './components/ConditionalHeading.svelte';

const app = new ConditionalHeading({
    target: document.getElementById('svelte-conditional-heading')
});

export default app;
