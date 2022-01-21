<script>
  import { Jumper } from 'svelte-loading-spinners';
  import filters from '../stores/filters';

  export let poolSize;
  export let isLoading;
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <div class="place-items-center place-content-center">
    <div class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">
      {$filters.mediaType} Pool
    </div>
    <div class="h-14 flex justify-center items-center">
      {#if isLoading}
        <Jumper size="70" color="#9333ea" unit="px" />
      {:else}
        <div class="stat-value text-purple-500">{poolSize}</div>
      {/if}
    </div>
  </div>
</div>
