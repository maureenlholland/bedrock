import Test from './Test.svelte';

const data = document.getElementById('data-svelte');

const app = new Test({
    target: document.getElementById('test-svelte'),
    props: {
        heading: data.dataset.heading,
        button1: data.dataset.button1,
        button2: data.dataset.button2
    }
});

export default app;
