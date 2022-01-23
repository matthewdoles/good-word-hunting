<script>
  import Nav from '../components/Nav.svelte';
  import '../app.css';
</script>

<Nav />
<div class="bg-white dark:bg-gray-900 h-full min-h-screen">
  <div class="p-8">
    <slot />
  </div>
</div>
