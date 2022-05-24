/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { LitElement, html } from 'lit';
export class MyElement extends LitElement {
    static properties = {
        vote: {},
        article: {}
    };

    constructor() {
        super();
        this.vote = 'NO VOTE YET';
        this.article = null;
    }

    handleClick(event) {
        console.log(this.article);
        if (this.article) {
            //  send to GA
            window.dataLayer.push({
                event: 'vpn-article-vote',
                label: this.article,
                value: this.vote
            });
        }
        this.vote = event.target.innerText;
    }

    //   cons with template html string, no autocomplete, no linting
    render() {
        return html`
            <slot name="title">Default text</slot>
            <p>${this.vote}</p>
            <button @click=${this.handleClick}>Helpful</button>
            <button @click=${this.handleClick}>Not helpful</button>
            <p ?hidden=${this.vote === 'NO VOTE YET'}>
                Thanks for your response!
            </p>
        `;
    }
}

customElements.define('my-element', MyElement);
