<script>
  import { createEventDispatcher } from 'svelte';
  import Avatar from './Avatar.svelte';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';

  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row mb-8 items-center p-8">
  <div class="flex flex-col">
    <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
    <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
  </div>
  <div class="flex flex-row ml-8">
    {#if $multiplayerUser.isAdmin}
      <button
        class="w-24 h-10 mr-4 bg-purple-500 border-purple-500 rounded-2xl font-bold text-white"
        on:click={() => {
          multiplayerLobby.startGame($multiplayerUser.lobbyId);
          multiplayerLobby.updateGameStarted();
        }}>Start</button
      >
    {/if}
    <button
      class="w-24 h-10 bg-red-500 border-red-500 rounded-2xl font-bold text-white"
      on:click={() => {
        multiplayerUser.leaveLobby($multiplayerUser.lobbyId, $multiplayerUser.id);
        multiplayerLobby.leaveLobby();
        dispatch('leavelobby');
      }}>Leave</button
    >
  </div>
</div>
<div class="mt-4 mb-8 grid gap-4 md:grid-cols-5 grid-cols-3">
  {#each $multiplayerLobby.users as user}
    <Avatar profileImage={user.profileImage} username={user.username} isAdmin={user.isAdmin} />
  {/each}
</div>
