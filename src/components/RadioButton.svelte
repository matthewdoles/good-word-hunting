<script>
  import { createEventDispatcher } from 'svelte';
  export let label;
  export let value;
  export let checked;
  export let containerClasses;
  export let radioClasses;
  export let name;

  const dispatch = createEventDispatcher();
</script>

<div class={`form-control ${containerClasses}`}>
  <label class="cursor-pointer label">
    <span class="text-xl dark:text-white">{label}</span>
    <input
      type="radio"
      {name}
      class={radioClasses}
      {value}
      {checked}
      on:change={() => dispatch('change', { value })}
    />
  </label>
</div>
