<script>
    import HeaderDidConfirm from './HeaderDidConfirm.svelte';
    import HeaderMaintenanceMode from './HeaderMaintenanceMode.svelte';
    import HeaderManageSettings from './HeaderManageSettings.svelte';

    export let headerType;
    let contentOptions = [
        { format: 'confirm', component: HeaderDidConfirm },
        { format: 'maintenance', component: HeaderMaintenanceMode },
        { format: 'manage', component: HeaderManageSettings }
    ];

    let component = contentOptions.find(
        (type) => type.format == headerType
    ).component;
</script>

<header class="mzp-l-content mzp-t-content-lg">
    <svelte:component this={component} />
</header>
