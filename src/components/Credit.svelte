<script>
  import { scale } from 'svelte/transition';
  export let credit;

  const cardClasses =
    'p-3 bg-gray-100 text-gray-800 text-center border-transparent border-4 h-full ' +
    'rounded-xl flex flex-row items-center ' +
    'dark:bg-gray-600 hover:border-purple-600';
</script>

<div class={cardClasses} in:scale>
  <div class="w-1/3 flex justify-center">
    <img
      class="mask p-2 rounded-xl"
      src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
      alt={credit.profile_path}
    />
  </div>
  <div class="flex flex-col w-2/3 items-center">
    <h2 class="text-xl capitalize font-bold dark:text-white">
      {credit.name}
    </h2>
    <h2 class="dark:text-white font-bold">as</h2>
    <h2 class="text-xl capitalize font-bold dark:text-white">
      {credit.character}
    </h2>
  </div>
</div>
