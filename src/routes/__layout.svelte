<script>
  import Nav from '../components/Nav.svelte';
  import '../app.css';
</script>

<svelte:head>
  <title>Good Word Hunting</title>
</svelte:head>

<Nav />
<div class="bg-white dark:bg-gray-900 h-full page-height">
  <slot />
</div>

<style>
  .page-height {
    min-height: calc(100vh - 4rem);
  }
</style>
