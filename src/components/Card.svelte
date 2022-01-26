<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  export let word;

  const dispatch = createEventDispatcher();

  const cardClasses =
    'p-6 bg-gray-100 text-gray-800 text-center border-transparent border-4 h-full ' +
    'rounded-xl flex flex-col items-center justify-center ' +
    'dark:bg-gray-600 hover:border-purple-600';
</script>

<div class={cardClasses} in:scale on:click={() => dispatch('cardselected', { word })}>
  <h2 class="capitalize font-bold dark:text-white">
    {word}
  </h2>
</div>
