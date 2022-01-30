<script>
  import { scale } from 'svelte/transition';
  import CreateJoinLobby from '../components/CreateJoinLobby.svelte';
  import Modal from '../components/Modal.svelte';
  import MultiplayerGame from '../components/MultiplayerGame.svelte';
  import MultiplayerLobby from '../components/MultiplayerLobby.svelte';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';

  let gameInProgress = $multiplayerLobby.gameInProgress;
  let enteringUserInfo = false;
  let isJoin;
  let isInPregameLobby = $multiplayerUser.lobbyId !== '';
  let message = '';
  let selectingJoinOrCreate = $multiplayerUser.lobbyId === '';
  let showModal = false;

  $: {
    if ($multiplayerUser.lobbyId !== '' && !$multiplayerLobby.gameInProgress) {
      enteringUserInfo = false;
      isInPregameLobby = true;
    }
    if ($multiplayerUser.lobbyId !== '' && $multiplayerLobby.gameInProgress) {
      gameInProgress = true;
      isInPregameLobby = false;
    }
    if ($multiplayerUser.error.length > 0) {
      message = $multiplayerUser.error;
      showModal = true;
    }
  }

  const handleSelectingJoinOrCreate = (joinClicked) => {
    enteringUserInfo = true;
    isJoin = joinClicked;
    selectingJoinOrCreate = false;
  };

  const handleGoBackToSelectingJoinOrCreate = () => {
    enteringUserInfo = false;
    selectingJoinOrCreate = true;
  };

  const handleCloseModal = () => {
    message = '';
    showModal = false;
    multiplayerUser.clearError();
  };
</script>

<div class="max-w-6xl mx-auto">
  {#if selectingJoinOrCreate}
    <div class="flex flex-col md:flex-row items-center justify-center w-full p-8">
      <button
        in:scale
        class="w-80 h-80 btn mx-4 mb-8 bg-purple-500 border-purple-500 rounded-3xl"
        on:click={() => handleSelectingJoinOrCreate(false)}
      >
        <p class="text-4xl font-bold">Create</p>
      </button>
      <button
        in:scale
        class="w-80 h-80 btn mx-4 mb-8 bg-purple-500 border-purple-500 rounded-3xl"
        on:click={() => handleSelectingJoinOrCreate(true)}
      >
        <p class="text-4xl font-bold">Join</p>
      </button>
    </div>
  {/if}

  {#if enteringUserInfo}
    <CreateJoinLobby {isJoin} on:goback={handleGoBackToSelectingJoinOrCreate} />
  {/if}

  {#if isInPregameLobby}
    <MultiplayerLobby
      on:leavelobby={() => {
        isInPregameLobby = false;
        selectingJoinOrCreate = true;
      }}
    />
  {/if}
</div>

{#if gameInProgress}
  <MultiplayerGame />
{/if}

{#if showModal}
  <input class="modal-toggle" type="checkbox" bind:checked={showModal} />
  <Modal {message} on:closemodal={handleCloseModal} />
{/if}
