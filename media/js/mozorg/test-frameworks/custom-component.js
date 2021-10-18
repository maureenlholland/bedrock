class VoteButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const { shadowRoot } = this;
        shadowRoot.innerHTML = `
        <style>button { color: black } button.selected { color: blue }</style>
        <h2><slot name="heading">Heading placeholder</slot></h2>
        <button name="button1" aria-pressed="false" class="mzp-c-button mzp-t-md">
            <slot name="button1">Button 1 Placeholder</slot>
        </button>
        <button name="button2" aria-pressed="false" class="mzp-c-button mzp-t-md">
            <slot name="button2">Button 2 Placeholder</slot>
        </button>
        `;

        Array.from(shadowRoot.querySelectorAll('button')).forEach((button) =>
            button.addEventListener('click', this.select)
        );
    }

    select(e) {
        e.target.classList.add('selected');
        e.target.setAttribute('aria-pressed', true);
    }
}

customElements.define('vote-buttons', VoteButtons);
