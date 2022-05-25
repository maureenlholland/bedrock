/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { LitElement, html, css } from 'lit';
import { litStyles } from './lit-styles.es6.js';
export class MyElement extends LitElement {
    // Note that only direct slotted children can be styled with ::slotted().
    // Also, children can be styled from outside the shadow tree, so you should regard your ::slotted() styles as default styles that can be overridden.
    // https://lit.dev/docs/components/styles/#slotted
    static styles = [
        litStyles,
        css`
            :host {
                text-align: center;
                color: green;
            }
            [aria-pressed='true'] {
                background-color: var(--my-background, turquoise);
                color: var(--my-color, black) !important;
            }
            div {
                display: flex;
                justify-content: center;
            }
            ::slotted(div) {
                color: purple;
            }
            ::slotted(.not-helpful) {
                color: red;
            }
            ::slotted(.not-helpful) span {
                color: black;
            }
            :host .sr-only {
                color: blue;
            }
            p {
                font-weight: bold;
                font-family: cursive;
            }
        `
    ];

    static properties = {
        _vote: { state: true },
        article: {},
        product: {}
    };

    constructor() {
        super();
        this._vote = 'NO VOTE YET';
        this.article = null;
        this.product = null;
    }

    handleClick(event) {
        console.log(this.article);
        if (this.article) {
            //  send to GA
            window.dataLayer.push({
                event: `${this.product}-article-vote`,
                label: this.article,
                value: this._vote
            });
        }
        this._vote = event.currentTarget.value;
    }

    //   cons with template html string, no autocomplete, no linting
    render() {
        return html`
            <slot name="title">Default text</slot>
            <p>
                Below flex container is not slotted div. Does not use
                <code>::slotted(div)</code> styles
            </p>
            <div>
                <button
                    @click=${this.handleClick}
                    aria-pressed=${this._vote === 'helpful'}
                    value="helpful"
                >
                    <slot name="helpful">Helpful</slot>
                </button>
                <button
                    @click=${this.handleClick}
                    aria-pressed=${this._vote === 'not helpful'}
                    value="not helpful"
                >
                    <slot name="not-helpful">Not helpful</slot>
                </button>
            </div>
            <p ?hidden=${this._vote === 'NO VOTE YET'}>
                Thanks for your response!
            </p>
        `;
    }
}

customElements.define('my-element', MyElement);
