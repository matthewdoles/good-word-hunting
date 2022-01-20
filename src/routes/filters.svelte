<script>
  import { onMount } from 'svelte';
  import filters from '../stores/filters';
  import { genres } from '../stores/genres';
  import RadioButton from '../components/RadioButton.svelte';
  import { getPoolSize } from '../functions/http-requests';

  let selectedMediaType = $filters.mediaType;
  let selectedGenre = $filters.genre;
  let voteCount = 1500;
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
    selectedGenre = '';
  };

  const onGenreChange = (event) => {
    selectedGenre = JSON.parse(event.detail.value);
    filters.changeGenre(JSON.parse(event.detail.value));
  };
</script>

<div class="flex flex-col md:flex-row w-full">
  <div class="w-full md:w-1/2 lg:w-1/3 px-4">
    <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
      <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Media Type</h3>
      <RadioButton
        label="Movies"
        name="media"
        radioClasses="radio bg-white checked:bg-purple-600"
        value="movie"
        checked={selectedMediaType === 'movie'}
        on:change={onMediaTypeChange}
      />
      <RadioButton
        label="TV"
        name="media"
        radioClasses="radio bg-white checked:bg-purple-600"
        value="tv"
        checked={selectedMediaType === 'tv'}
        on:change={onMediaTypeChange}
      />
    </div>
    <!-- <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
      <div class="place-items-center place-content-center bg-gray-10">
        <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Vote Count</h3>
        <input type="range" max="2000" bind:value={voteCount} class="range" />
        <div class="stat-value text-purple-500">{voteCount}</div>
      </div>
    </div> -->
    <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
      <div class="place-items-center place-content-center bg-gray-10">
        <div class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">
          {$filters.mediaType} Pool
        </div>
        <div class="stat-value text-purple-500">{poolSize}</div>
        <!-- <button
          on:click={getMediaPool}
          class="m-2 mt-4 px-8 py-2 rounded-lg outline-0 border-purple-500 uppercase font-bold bg-purple-500 text-white"
        >
          Refresh
        </button> -->
      </div>
    </div>
  </div>
  <div class="w-full md:w-1/2 lg:w-2/3 px-4">
    <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
      <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Genre</h3>
      {#if $filters.mediaType === 'movie'}
        <div class="flex radio-table">
          <div class="w-full lg:w-1/2">
            {#each $genres.movies as genre, i}
              {#if i < 9}
                <RadioButton
                  label={genre.name}
                  value={JSON.stringify(genre)}
                  name="genre"
                  containerClasses="lg:mr-4"
                  radioClasses="radio bg-white checked:bg-purple-600"
                  checked={selectedGenre === genre.name}
                  on:change={onGenreChange}
                />
              {/if}
            {/each}
          </div>
          <div class="w-full lg:w-1/2">
            {#each $genres.movies as genre, i}
              {#if i > 9}
                <RadioButton
                  label={genre.name}
                  name="genre"
                  containerClasses="lg:ml-4"
                  radioClasses="radio bg-white checked:bg-purple-600"
                  value={JSON.stringify(genre)}
                  checked={selectedGenre === genre.name}
                  on:change={onGenreChange}
                />
              {/if}
            {/each}
          </div>
        </div>
      {/if}
      {#if $filters.mediaType === 'tv'}
        <div class="flex radio-table">
          <div class="w-full lg:w-1/2">
            {#each $genres.tv as genre, i}
              {#if i < 9}
                <RadioButton
                  label={genre.name}
                  name="genre"
                  containerClasses="lg:mr-4"
                  radioClasses="radio bg-white checked:bg-purple-600"
                  value={JSON.stringify(genre)}
                  checked={selectedGenre === genre.name}
                  on:change={onGenreChange}
                />
              {/if}
            {/each}
          </div>
          <div class="w-full lg:w-1/2">
            {#each $genres.movies as genre, i}
              {#if i > 9}
                <RadioButton
                  label={genre.name}
                  name="genre"
                  containerClasses="lg:ml-4"
                  radioClasses="radio bg-white checked:bg-purple-600"
                  value={JSON.stringify(genre)}
                  checked={selectedGenre === genre.name}
                  on:change={onGenreChange}
                />
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .radio-table {
    flex-direction: column;
  }
  @media only screen and (min-width: 1020px) {
    .radio-table {
      flex-direction: row;
    }
  }
</style>
