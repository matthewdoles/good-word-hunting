<script>
  import { onMount } from 'svelte';
  import filters from '../stores/filters';
  import { getPoolSize } from '../functions/http-requests';
  import GameDifficulty from '../components/GameDifficulty.svelte';
  import MediaGenres from '../components/MediaGenres.svelte';
  import MediaTypeFilter from '../components/MediaTypeFilter.svelte';
  import MediaPoolSize from '../components/MediaPoolSize.svelte';
  import MediaPopularity from '../components/MediaPopularity.svelte';

  let selectedMediaType = $filters.mediaType;
  let selectedGenre = $filters.genre;
  let voteCount = $filters.voteCount;
  let rating = $filters.rating;
  let poolSize = 0;
  let timer;
  let loadingPool;

  onMount(() => {
    getMediaPool();
  });

  const getMediaPool = async () => {
    loadingPool = true;
    const poolInfo = await getPoolSize();
    poolSize = poolInfo.total_results;
    loadingPool = false;
  };

  const debouncedGetMediaPool = () => {
    loadingPool = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getMediaPool();
    }, 1500);
  };

  const onMediaTypeChange = (event) => {
    selectedMediaType = event.detail.value;
    filters.changeMediaType(event.detail.value);
    getMediaPool();
    voteCount = $filters.voteCount;
    rating = $filters.rating;
    selectedGenre = '';
  };

  const onGenreChange = (event) => {
    selectedGenre = JSON.parse(event.detail.value);
    filters.changeGenre(JSON.parse(event.detail.value));
    debouncedGetMediaPool();
  };
</script>

<div class="max-w-6xl mx-auto p-8">
  <div class="flex flex-col md:flex-row w-full">
    <div class="px-4 w-full md:w-1/2 lg:w-1/3">
      <MediaPoolSize {poolSize} isLoading={loadingPool} />
      <MediaTypeFilter {selectedMediaType} on:change={onMediaTypeChange} />
      <GameDifficulty />
    </div>
    <div class="w-full md:w-1/2 lg:w-2/3 px-4">
      <MediaGenres {selectedGenre} on:change={onGenreChange} />
      <MediaPopularity {voteCount} {rating} on:updatepool={debouncedGetMediaPool} />
    </div>
  </div>
</div>
