import App from './App.svelte';

const data = document.getElementById('svelte-data');

const app = new App({
    target: document.getElementById('svelte-app'),
    props: {
        heading: data.dataset.heading,
        button1: data.dataset.button1,
        button2: data.dataset.button2
    }
});

export default app;
