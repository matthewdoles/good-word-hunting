<script>
  import { onMount } from 'svelte';
  import FaLightbulb from 'svelte-icons/fa/FaLightbulb.svelte';

  let darkMode = true;

  onMount(() => {
    darkMode = document.documentElement.classList.add('dark');
  });
</script>

<div class="navbar shadow-md bg-purple-600 text-neutral-content nav-height">
  <div class="px-2 mx-2 title">
    <span class="text-lg font-bold">Good Word Hunting</span>
  </div>
  <div class="px-2 mx-2">
    <a class="btn btn-ghost btn-sm rounded-btn" href="/">Home</a>
    <a class="btn btn-ghost btn-sm rounded-btn" href="/filters">Filters</a>
    <a class="btn btn-ghost btn-sm rounded-btn" href="/multiplayer">Multiplayer</a>
    <div
      class="mx-4 text-lg dark:text-yellow-300 w-7 h-7 cursor-pointer"
      on:click={() => {
        document.documentElement.classList.toggle('dark');
        darkMode = !darkMode;
      }}
    >
      <FaLightbulb />
    </div>
  </div>
</div>

<style>
  .nav-height {
    min-height: 4rem;
    max-height: 4rem;
  }
  @media (max-width: 700px) {
    .title {
      display: none !important;
    }
  }
</style>
