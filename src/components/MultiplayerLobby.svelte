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
  let message = '';

  const dispatch = createEventDispatcher();

  $: {
    if ($multiplayerUser.error.length > 0) {
      isLoading = false;
      showModal = true;
      message = $multiplayerUser.error;
    }
  }

  const handleCloseModal = () => {
    showModal = false;
    multiplayerUser.clearError();
  };

  const handleShowCopyLink = () => {
    showModal = true;
    message = `https://good-word-hunting.vercel.app?lobby=${$multiplayerUser.lobbyId}`;
  };

  const handleShowAdminNote = () => {
    showModal = true;
    message =
      'As the lobby admin, your current filters will be applied for the entire lobby. ' +
      'You can visit and update your filters right now and throughout the game while remaining in this lobby. ' +
      'Changes made during the game will go into effect the following round.';
  };
</script>

<div class="flex flex-col md:flex-row items-center p-8">
  <div in:fly={{ x: -400, duration: 500 }} class="flex flex-col">
    <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
    <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
  </div>
  <div
    in:fly={{ x: 400, duration: 500 }}
    class="flex mobile-button-container items-center justify-center mt-4 md:ml-8"
  >
    {#if $multiplayerUser.isAdmin}
      <div class="flex items-center">
        <button
          class="w-24 h-10 flex items-center justify-center mobile-button bg-purple-500 border-purple-500 rounded-2xl font-bold text-white"
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
          class="w-24 h-10 mobile-button bg-green-500 border-blue-500 rounded-2xl font-bold text-white"
          on:click={handleShowAdminNote}
        >
          Admin
        </button>
      </div>
    {/if}
    {#if !isLoading}
      <div class="flex items-center">
        <button
          class="w-24 h-10 mobile-button bg-blue-500 border-blue-500 rounded-2xl font-bold text-white"
          on:click={handleShowCopyLink}
        >
          Link
        </button>
        <button
          class="w-24 h-10 mobile-button bg-red-500 border-red-500 rounded-2xl font-bold text-white"
          on:click={() => {
            multiplayerUser.leaveLobby($multiplayerUser.lobbyId, $multiplayerUser.id);
            multiplayerLobby.leaveLobby();
            dispatch('leavelobby');
          }}
          >Leave
        </button>
      </div>
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
  <Modal {message} on:closemodal={handleCloseModal} />
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
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
</style>
