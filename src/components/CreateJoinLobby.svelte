<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Jumper } from 'svelte-loading-spinners';
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';

  import Avatar from './Avatar.svelte';
  import Modal from './Modal.svelte';
  import multiplayerUser from '../stores/multiplayerUser';

  export let isJoin;

  let error = '';
  let isLoading = false;
  let lobbyId = '';
  let profileImage = '';
  let previewAvatar = false;
  let showModal = false;
  let username = '';

  const dispatch = createEventDispatcher();

  const inputClasses =
    'w-full md:w-1/2 h-20 bg-gray-100 rounded-xl ' +
    'outline-0 text-lg p-4 my-4 border-4 border-purple-500 font-bold ' +
    'dark:bg-gray-800 dark:text-white';

  $: {
    if ($multiplayerUser.error.length > 0) {
      error = $multiplayerUser.error;
      isLoading = false;
      showModal = true;
    }
    if (username.length === 0 && profileImage.length === 0) {
      previewAvatar = false;
    }
  }

  const createOrJoin = () => {
    if (username.length === 0) {
      error = 'Please enter a Username.';
      showModal = true;
      return;
    }

    isLoading = true;
    if (isJoin) {
      return multiplayerUser.joinLobby(username, profileImage, lobbyId);
    }
    multiplayerUser.createLobby(username, profileImage);
  };

  const handlePreviewAvatar = () => {
    if (username.length > 0 || profileImage.length > 0) {
      previewAvatar = true;
    } else {
      error = 'Please enter a Username or Profile Image URL.';
      showModal = true;
    }
  };

  const handleCloseModal = () => {
    showModal = false;
    multiplayerUser.clearError();
  };
</script>

<div class="mx-4">
  <div in:fly={{ x: -400, duration: 500 }} class="w-full md:w-1/2 mx-auto">
    <div
      class="w-24 h-24 flex flex-row items-end text-purple-500 cursor-pointer"
      on:click={() => dispatch('goback')}
    >
      <MdArrowBack />
      <p class="text-2xl font-bold mb-2">Back</p>
    </div>
  </div>

  <div class="flex flex-col w-full items-center">
    <input
      in:fly={{ x: 400, duration: 500 }}
      class={inputClasses}
      type="text"
      placeholder="Username"
      bind:value={username}
    />
    <div
      class="w-full md:w-1/2 flex justify-center items-center"
      in:fly={{ x: -400, duration: 500 }}
    >
      <input
        class={`${inputClasses} md:w-full h-20 input-radius`}
        type="text"
        placeholder="Profile Image URL (optional)"
        bind:value={profileImage}
      />
      <button
        class="mobile-hide text-sm h-20 px-2 rounded-l-none rounded-xl outline-0 border-purple-500 bg-purple-500 uppercase font-bold text-white"
        on:click={handlePreviewAvatar}
      >
        Preview
      </button>
    </div>
    <button
      in:fly={{ y: 400, duration: 500 }}
      class="btn mobile-show w-full md:w-1/2 h-20 m-4 p-4 bg-purple-500 border-purple-500 font-bold text-xl"
      on:click={handlePreviewAvatar}
    >
      Preview
    </button>
    {#if previewAvatar && (username.length > 0 || profileImage.length > 0)}
      <div class="mt-2 text-center">
        <Avatar isAdmin={false} isGuessing={false} isListItem={false} {profileImage} {username} />
        <p class="pt-2 text-lg font-bold dark:text-white">
          {username}
        </p>
      </div>
    {/if}
    {#if isJoin}
      <input
        in:fly={{ x: 400, duration: 500 }}
        class={inputClasses}
        type="text"
        placeholder="Lobby Code"
        bind:value={lobbyId}
      />
    {/if}

    <button
      in:fly={{ y: 400, duration: 500 }}
      class="btn w-full md:w-1/2 h-20 m-4 p-4 bg-purple-500 border-purple-500 font-bold text-xl"
      on:click={() => {
        if (!isLoading) {
          createOrJoin();
        }
      }}
    >
      {#if isLoading}
        <Jumper size="50" color="white" unit="px" />
      {:else}
        {isJoin ? 'Join' : 'Create'}
      {/if}
    </button>
  </div>
</div>

{#if showModal}
  <input class="modal-toggle" type="checkbox" bind:checked={showModal} />
  <Modal message={error} on:closemodal={handleCloseModal} />
{/if}

<style>
  @media (max-width: 900px) {
    .input-radius {
      border-bottom-right-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
    }
    .mobile-hide {
      display: none !important;
    }
  }
  @media (min-width: 900px) {
    .input-radius {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    .mobile-show {
      display: none !important;
    }
  }
</style>
