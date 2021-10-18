class VoteButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const { shadowRoot } = this;
        shadowRoot.innerHTML = `
        <h2><slot name="heading">Heading placeholder</slot></h2>
        <button name="button1" aria-pressed="false" class="mzp-c-button mzp-t-md">
            <slot name="button1">Button 1 Placeholder</slot>
        </button>
        <button name="button2" aria-pressed="false" class="mzp-c-button mzp-t-md">
            <slot name="button2">Button 2 Placeholder</slot>
        </button>
        `;
    }
}

customElements.define('vote-buttons', VoteButtons);
