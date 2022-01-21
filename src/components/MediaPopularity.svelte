<script>
  export let voteCount;
  export let rating;

  let rangeValue = rating * 10;

  $: {
    rating = rangeValue / 10;
  }
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <div class="place-items-center place-content-center bg-gray-10">
    <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Vote Count</h3>
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
