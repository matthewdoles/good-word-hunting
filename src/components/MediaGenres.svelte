<script>
  import RadioButton from './RadioButton.svelte';
  import filters from '../stores/filters';
  import { genres } from '../stores/genres';

  export let selectedGenre;
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Genre</h3>
  {#if $filters.mediaType === 'movie'}
    <div class="flex radio-table">
      <div class="w-full lg:w-1/2">
        {#each $genres.movies as genre, i}
          {#if i < 9}
            <RadioButton
              checked={selectedGenre.name === genre.name}
              containerClasses="lg:mr-4"
              label={genre.name}
              name="genre"
              radioClasses="radio bg-white checked:bg-purple-600"
              value={JSON.stringify(genre)}
              on:change
            />
          {/if}
        {/each}
      </div>
      <div class="w-full lg:w-1/2">
        {#each $genres.movies as genre, i}
          {#if i > 9}
            <RadioButton
              checked={selectedGenre.name === genre.name}
              containerClasses="lg:mr-4"
              label={genre.name}
              name="genre"
              radioClasses="radio bg-white checked:bg-purple-600"
              value={JSON.stringify(genre)}
              on:change
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
              checked={selectedGenre.name === genre.name}
              containerClasses="lg:mr-4"
              label={genre.name}
              name="genre"
              radioClasses="radio bg-white checked:bg-purple-600"
              value={JSON.stringify(genre)}
              on:change
            />
          {/if}
        {/each}
      </div>
      <div class="w-full lg:w-1/2">
        {#each $genres.movies as genre, i}
          {#if i > 9}
            <RadioButton
              checked={selectedGenre.name === genre.name}
              containerClasses="lg:mr-4"
              label={genre.name}
              name="genre"
              radioClasses="radio bg-white checked:bg-purple-600"
              value={JSON.stringify(genre)}
              on:change
            />
          {/if}
        {/each}
      </div>
    </div>
  {/if}
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
