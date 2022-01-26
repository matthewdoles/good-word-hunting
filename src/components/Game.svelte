<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import filters from '../stores/filters';
  import Card from './Card.svelte';

  export let keywords;
  export let cast;
  export let similarMedia;
  export let isMultiplayer;

  let showNumbers = true;
  let showNames = false;
  let showMultipleChoice = false;
  let showInput = false;
  let showHint = true;
  let numberOfNames;
  let guess;
  let difficulty = $filters.difficulty;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (difficulty === 'Easy') {
      showNames = true;
      numberOfNames = 10;
      showNumbers = false;
      showMultipleChoice = true;
    }
    if (difficulty === 'Hard') {
      showHint = false;
    }
    if (difficulty === 'Impossible') {
      showNumbers = false;
      showInput = true;
      showHint = false;
    }
  });

  const onNumberSelected = (event) => {
    numberOfNames = event.detail.word;
    showNumbers = false;
    showNames = true;
    showInput = true;
  };
</script>

<h3 class="text-2xl dark:text-white" in:fly={{ x: -400, duration: 750 }}>
  {keywords.length} words used to describe this {$filters.prompt.singular} are...
</h3>
<div
  class={isMultiplayer
    ? 'mt-4 mb-8 grid gap-4 md:grid-cols-3 grid-cols-2'
    : 'mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2'}
>
  {#each keywords as keyword}
    <Card word={keyword.name} />
  {/each}
</div>

{#if showNumbers}
  <h3 class="text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
    How many names do you need to guess this {$filters.prompt.singular}?
  </h3>
  <p class="dark:text-white" in:fly={{ x: 400, duration: 750 }}>
    * from lowest billed to highest billed
  </p>
  <div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
    <div class="cursor-pointer">
      <Card word={0} on:cardselected={onNumberSelected} />
    </div>
    {#each cast as credit, i}
      <div class="cursor-pointer">
        <Card word={i + 1} on:cardselected={onNumberSelected} />
      </div>
    {/each}
  </div>
{/if}

{#if showNames}
  {#if numberOfNames !== 0}
    <h3 class="text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
      Out of the {cast.length} credits in this {$filters.prompt.singular}, the {numberOfNames} names
      from lowest billed to highest are...
    </h3>
    <div
      class={isMultiplayer
        ? 'mt-4 mb-8 grid gap-4 md:grid-cols-3 grid-cols-2'
        : 'mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2'}
    >
      {#each cast as credit, i}
        {#if i < numberOfNames}
          <Card word={credit.name} />
        {/if}
      {/each}
    </div>
  {/if}
{/if}
{#if showMultipleChoice}
  <h3 class="mt-8 text-2xl dark:text-white" in:fly={{ x: 400, duration: 750 }}>
    Which of these {$filters.prompt.plural} do you think it could be?
  </h3>
  <p class="dark:text-white" in:fly={{ x: 400, duration: 750 }}>* click to guess</p>
  <div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
    {#each similarMedia as media}
      <div class="cursor-pointer h-full">
        <Card
          word={media.title}
          on:cardselected={() => dispatch('guesssubmit', { guess: media.title })}
        />
      </div>
    {/each}
  </div>
{/if}
{#if showInput}
  <div in:fly={{ y: 400, duration: 750 }}>
    <h3 class="text-2xl dark:text-white">
      What is the name of this {$filters.prompt.singular}?
    </h3>
    <div class="my-4">
      <div class="flex">
        <input
          class="w-full bg-gray-100 rounded-l-xl text-lg p-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
          type="text"
          placeholder={$filters.mediaType === 'movie' ? 'Name of movie' : 'Name of show'}
          on:keyup={(e) => e.key === 'Enter' && dispatch('guesssubmit', { guess })}
          bind:value={guess}
        />
        <button
          on:click={() => dispatch('guesssubmit', { guess })}
          class={showHint
            ? 'text-sm p-4 rounded-l-none outline-0 border-purple-500 bg-purple-500 uppercase font-bold text-white'
            : 'text-sm p-4 rounded-r-xl outline-0 border-purple-500 bg-purple-500 uppercase font-bold text-white'}
          >Submit
        </button>
        {#if showHint}
          <button
            on:click={() => (showMultipleChoice = true)}
            class="text-sm p-4 rounded-l-none rounded-r-xl outline-0 border-purple-500 uppercase font-bold bg-gray-100 dark:bg-gray-600 dark:text-white"
            >Hint
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  input {
    outline: none !important;
  }
</style>
