<script>
  import { createEventDispatcher } from 'svelte';
  import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';
  import filters from '../stores/filters';

  export let voteCount;
  export let rating;

  let rangeValue = rating * 10;

  const dispatch = createEventDispatcher();

  $: {
    filters.changeVoteCount(voteCount);
    dispatch('updatepool');
  }

  $: {
    rating = rangeValue / 10;
    filters.changeRating(rating);
    dispatch('updatepool');
  }
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <div class="place-items-center place-content-center bg-gray-10">
    <div class="flex flex-row items-center justify-center">
      <h3 class="text-2xl text-center font-bold uppercase dark:text-white">Popularity</h3>
      <div
        data-tip="Searches for media equal to or greater than the selected values"
        class="tooltip"
      >
        <button class="h-5 ml-2 mt-2 text-blue-500"><FaInfoCircle /></button>
      </div>
    </div>
    <div class="my-4">
      <input type="range" max="2000" bind:value={voteCount} class="range" />
      <div class="dark:text-white">Total Votes</div>
      <div class="stat-value text-purple-500">{voteCount}</div>
    </div>
    <input type="range" max="100" bind:value={rangeValue} class="range" />
    <div class="dark:text-white">Rating</div>
    <div class="stat-value text-purple-500">{rating}</div>
  </div>
</div>
