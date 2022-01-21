<script>
  import { onMount } from 'svelte';
  import filters from '../stores/filters';
  import { getPoolSize } from '../functions/http-requests';
  import MediaGenres from '../components/MediaGenres.svelte';
  import MediaTypeFilter from '../components/MediaTypeFilter.svelte';
  import MediaPoolSize from '../components/MediaPoolSize.svelte';
  import MediaPopularity from '../components/MediaPopularity.svelte';

  let selectedMediaType = $filters.mediaType;
  let selectedGenre = $filters.genre;
  let voteCount = $filters.voteCount;
  let rating = $filters.rating;
  let poolSize = 0;

  onMount(() => {
    getMediaPool();
  });

  const getMediaPool = async () => {
    poolSize = await getPoolSize();
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
  };
</script>

<div class="flex flex-col md:flex-row w-full">
  <div class="px-4 w-full md:w-1/2 lg:w-1/3">
    <MediaTypeFilter {selectedMediaType} on:change={onMediaTypeChange} />
    <MediaPoolSize {poolSize} />
    <MediaPopularity {voteCount} {rating} />
  </div>
  <div class="w-full md:w-1/2 lg:w-2/3 px-4">
    <MediaGenres {selectedGenre} on:change={onGenreChange} />
  </div>
</div>
