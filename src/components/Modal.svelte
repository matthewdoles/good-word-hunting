<script>
  import { createEventDispatcher } from 'svelte';

  export let message;

  const dispatch = createEventDispatcher();
</script>

<div class="modal dark:bg-gray-700/75">
  <div class="modal-box border-purple-500 border-4 dark:bg-gray-700">
    <p class="text-2xl font-bold dark:text-white">
      {message}
    </p>
    <div class="modal-action">
      <label
        for="my-modal-2"
        class="btn bg-purple-500 border-none"
        on:click={() => dispatch('closemodal')}
      >
        Close
      </label>
    </div>
  </div>
</div>
