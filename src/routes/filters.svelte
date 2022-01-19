<script>
  import filters from '../stores/filters';
  import { genres } from '../stores/genres';

  let selectedMediaType = $filters.mediaType;
  let selectedGenre = $filters.genre;

  const cardClasses = 'p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600';

  const onMediaTypeChange = (event) => {
    selectedMediaType = event.currentTarget.value;
    filters.changeMediaType(event.currentTarget.value);
    selectedGenre = '';
  };

  const onGenreChange = (event) => {
    selectedGenre = JSON.parse(event.currentTarget.value);
    filters.changeGenre(JSON.parse(event.currentTarget.value));
  };
</script>

<div class="flex flex-col items-center">
  <div class="w-full md:w-1/2 lg:w-1/3">
    <div class={cardClasses}>
      <h3 class="text-2xl text-center font-bold uppercase dark:text-white">Media Type</h3>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="text-xl dark:text-white">Movies</span>
          <input
            type="radio"
            name="media"
            class="radio bg-white checked:bg-purple-600"
            value="movie"
            checked={selectedMediaType === 'movie'}
            on:change={onMediaTypeChange}
          />
        </label>
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="text-lg dark:text-white">TV</span>
          <input
            type="radio"
            name="media"
            class="radio bg-white checked:bg-purple-600"
            value="tv"
            checked={selectedMediaType === 'tv'}
            on:change={onMediaTypeChange}
          />
        </label>
      </div>
    </div>

    <div class={cardClasses}>
      <h3 class="text-2xl text-center font-bold uppercase dark:text-white">Genre</h3>
      {#if $filters.mediaType === 'movie'}
        {#each $genres.movies as genre}
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="text-xl dark:text-white">{genre.name}</span>
              <input
                type="radio"
                name="genre"
                class="radio bg-white checked:bg-purple-600"
                value={JSON.stringify(genre)}
                checked={selectedGenre === genre.name}
                on:change={onGenreChange}
              />
            </label>
          </div>
        {/each}
      {/if}
      {#if $filters.mediaType === 'tv'}
        {#each $genres.tv as genre}
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="text-xl dark:text-white">{genre.name}</span>
              <input
                type="radio"
                name="genre"
                class="radio bg-white checked:bg-purple-600"
                value={JSON.stringify(genre)}
                checked={selectedGenre === genre.name}
                on:change={onGenreChange}
              />
            </label>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
