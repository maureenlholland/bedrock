/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import VoteButtons from '../../components/VoteButtons.svelte';

const target = document.getElementById('svelte-vote-buttons');

const app = new VoteButtons({
    target: target,
    props: {
        heading: target.dataset.heading,
        button1: target.dataset.button1,
        button2: target.dataset.button2,
        article: target.dataset.article
    }
});

export default app;
