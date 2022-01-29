<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Jumper } from 'svelte-loading-spinners';
  import Card from './Card.svelte';
  import Credit from './Credit.svelte';
  import Modal from './Modal.svelte';
  import multiplayerUser from '../stores/multiplayerUser';

  export let guess;
  export let media;
  export let cast;
  export let keywords;
  export let isCorrect;
  export let isMultiplayer;
  export let isAdmin;
  export let users;
  export let filter;

  let error = '';
  let isLoading = false;
  let showModal = false;

  const dispatch = createEventDispatcher();

  $: {
    if ($multiplayerUser.error.length > 0) {
      isLoading = false;
      showModal = true;
      error = $multiplayerUser.error;
    }
  }

  const handleCloseModal = () => {
    showModal = false;
    multiplayerUser.clearError();
  };
</script>

<h3
  class="text-2xl flex justify-center mb-4 dark:text-white"
  in:fade={{
    delay: 0,
    duration: 1000
  }}
>
  You guessed: <p class="text-2xl font-bold pl-2">{guess}</p>
</h3>
<h3
  class="text-2xl text-center my-4 dark:text-white"
  in:fade={{
    delay: 1000,
    duration: 1000
  }}
>
  Your answer is...
</h3>
<div
  in:fade={{
    delay: 3000,
    duration: 1000
  }}
>
  <div class="text-2xl my-4 dark:text-white">
    {#if isCorrect}
      <div class="flex justify-center">
        <p class="text-green-500 font-bold pr-2">Correct!</p>
        <p>The {filter.prompt.singular} was <b>{media.title}</b></p>
      </div>
    {:else}
      <div class="flex justify-center">
        <p class="text-red-500 font-bold pr-2">Incorrect!</p>
        <p>The {filter.prompt.singular} was <b>{media.title}</b></p>
      </div>
    {/if}
  </div>
  <div class="flex flex-col items-center">
    <a
      href={`https://www.themoviedb.org/movie/${media.id}-${media.title.split(' ').join('-')}`}
      target="_blank"
      class="w-1/2 md:w-1/4 my-4"
    >
      <img
        class="border-4 border-transparent hover:border-purple-600"
        href={`https://www.themoviedb.org/movie/${media.id}-${media.title.split(' ').join('-')}`}
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={media.title}
      />
    </a>
    {#if isAdmin}
      <button
        class="w-1/2 md:w-1/4 btn btn-block my-4 border-0 bg-purple-600 font-bold"
        on:click={() => {
          if (!isLoading) {
            isLoading = true;
            dispatch('newgame');
          }
        }}
        >{#if isLoading}
          <Jumper size="30" color="white" unit="px" />
        {:else}
          Play Again
        {/if}</button
      >
    {/if}
  </div>
  {#if isMultiplayer}
    <div class="mt-10 mb-8 grid gap-4 md:grid-cols-2 grid-cols-1">
      {#each users as user}
        <div
          class="p-2 mb-8 relative bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600"
        >
          <div class="flex flex-col">
            <div class="flex flex-row items-center">
              <div class="avatar placeholder indicator m-2">
                {#if user.profileImage}
                  <div class="rounded-full w-10 h-10">
                    <img src={user.profileImage} alt="Profile Pic" />
                  </div>
                {:else}
                  <div class="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span class="text-xl">{user.username.charAt(0)}</span>
                  </div>
                {/if}
              </div>
              <p class="ml-2 text-xl font-bold dark:text-white">
                {user.username}
              </p>
            </div>
            <p
              class={user.scoreAdded === 0
                ? 'mx-2 mb-4 text-3xl font-bold text-red-500'
                : 'mx-2 mb-4 text-3xl font-bold text-green-500'}
            >
              {user.guess}
            </p>
            <p class="absolute top-3 right-3 mb-4 stat-value text-purple-500">
              +{user.scoreAdded}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  <h3 class="text-2xl dark:text-white">Keywords</h3>
  <div class="mt-4 mb-8 grid gap-4 md:grid-cols-4 grid-cols-2">
    {#each keywords as keyword}
      <Card word={keyword.name} />
    {/each}
  </div>
  <h3 class="text-2xl dark:text-white">Cast</h3>
  <div class="mt-4 mb-8 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each cast as credit, i}
      <a
        href={`https://www.themoviedb.org/person/${credit.id}-${credit.name.split(' ').join('-')}`}
        target="_blank"
      >
        <Credit {credit} /></a
      >
    {/each}
  </div>
</div>

{#if showModal}
  <input class="modal-toggle" type="checkbox" bind:checked={showModal} />
  <Modal message={error} on:closemodal={handleCloseModal} />
{/if}
