<script>
  import filters from '../stores/filters';

  export let poolSize;
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <div class="place-items-center place-content-center">
    <div class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">
      {$filters.mediaType} Pool
    </div>
    <div class="stat-value text-purple-500">{poolSize}</div>
  </div>
</div>
