<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Jumper } from 'svelte-loading-spinners';

  import Avatar from './Avatar.svelte';
  import Modal from './Modal.svelte';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';

  let isLoading = false;
  let showModal = false;
  let error = '';

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

  const handleShowCopyLink = () => {
    showModal = true;
    error = `https://good-word-hunting.vercel.app?lobby=${$multiplayerUser.lobbyId}`;
  };
</script>

<div class="flex flex-col md:flex-row mb-8 items-center p-8">
  <div in:fly={{ x: -400, duration: 500 }} class="flex flex-col">
    <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
    <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
  </div>
  <div
    in:fly={{ x: 400, duration: 500 }}
    class="flex mobile-button-container items-center mt-4 md:ml-8"
  >
    {#if $multiplayerUser.isAdmin}
      <button
        class="w-24 h-10 bg-purple-500 border-purple-500 rounded-2xl font-bold text-white"
        on:click={() => {
          isLoading = true;
          multiplayerLobby.startGame($multiplayerUser.lobbyId);
          multiplayerLobby.updateGameStarted();
        }}
      >
        {#if isLoading}
          <Jumper size="30" color="white" unit="px" />
        {:else}
          Start
        {/if}
      </button>
      <button
        class="w-24 h-10 mobile-button bg-blue-500 border-blue-500 rounded-2xl font-bold text-white"
        on:click={handleShowCopyLink}
      >
        Link
      </button>
    {/if}
    {#if !isLoading}
      <button
        class="w-24 h-10 mobile-button bg-red-500 border-red-500 rounded-2xl font-bold text-white"
        on:click={() => {
          multiplayerUser.leaveLobby($multiplayerUser.lobbyId, $multiplayerUser.id);
          multiplayerLobby.leaveLobby();
          dispatch('leavelobby');
        }}
        >Leave
      </button>
    {/if}
  </div>
</div>
<div class="m-4 mb-8 grid gap-4 lg:grid-cols-5 md:grid-cols-4 grid-cols-2">
  {#each $multiplayerLobby.users as user}
    <div class="flex flex-col items-center">
      <Avatar profileImage={user.profileImage} username={user.username} isAdmin={user.isAdmin} />
      <p class="pt-2 text-lg font-bold dark:text-white">
        {user.username}
      </p>
    </div>
  {/each}
</div>

{#if showModal}
  <input class="modal-toggle" type="checkbox" bind:checked={showModal} />
  <Modal message={error} on:closemodal={handleCloseModal} />
{/if}

<style>
  .mobile-button-container {
    flex-direction: row;
  }
  .mobile-button {
    margin-left: 1rem;
  }

  @media (max-width: 600px) {
    .mobile-button-container {
      flex-direction: column;
    }
    .mobile-button {
      margin-top: 1rem;
      margin-left: 0;
    }
  }
</style>
