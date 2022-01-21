<script>
  import { createEventDispatcher } from 'svelte';
  import RadioButton from './RadioButton.svelte';
  export let selectedMediaType;

  const dispatch = createEventDispatcher();
</script>

<div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
  <h3 class="pb-2 text-2xl text-center font-bold uppercase dark:text-white">Media Type</h3>
  <RadioButton
    label="Movies"
    name="media"
    radioClasses="radio bg-white checked:bg-purple-600"
    value="movie"
    checked={selectedMediaType === 'movie'}
    on:change
  />
  <RadioButton
    label="TV"
    name="media"
    radioClasses="radio bg-white checked:bg-purple-600"
    value="tv"
    checked={selectedMediaType === 'tv'}
    on:change
  />
</div>
