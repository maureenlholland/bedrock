/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { define, html } from 'hybrids';

export default define({
    tag: 'bedrock-newsletter-basic-settings',
    name: '',
    render: ({ name }) => html` <h1>Hello ${name}!</h1> `.css`
    :host { display: block; }
    h1 { color: red }
  `
});
