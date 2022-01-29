<script>
  import RadioButton from './RadioButton.svelte';
  export let selectedMediaType;
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Media Type</h3>
  <RadioButton
    checked={selectedMediaType === 'movie'}
    label="Movies"
    name="media"
    radioClasses="radio bg-white checked:bg-purple-600"
    value="movie"
    on:change
  />
  <RadioButton
    checked={selectedMediaType === 'tv'}
    label="TV"
    name="media"
    radioClasses="radio bg-white checked:bg-purple-600"
    value="tv"
    on:change
  />
</div>
