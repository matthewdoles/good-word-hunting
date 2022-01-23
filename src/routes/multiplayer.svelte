<script>
  import CreateJoinLobby from '../components/CreateJoinLobby.svelte';
  import MultiplayerLobby from '../components/MultiplayerLobby.svelte';
  import multiplayerUser from '../stores/multiplayerUser';

  let isJoin = true;
  let selectingJoinOrCreate = $multiplayerUser.room === '';
  let enteringUserInfo = false;
  let isInLobby = $multiplayerUser.room !== '';

  $: {
    if ($multiplayerUser.room !== '') {
      isInLobby = true;
      enteringUserInfo = false;
    }
  }
</script>

{#if selectingJoinOrCreate}
  <div class="flex justify-center w-full">
    <button
      class="w-80 h-80 btn mx-4 bg-purple-500 border-purple-500 rounded-3xl"
      on:click={() => {
        isJoin = false;
        enteringUserInfo = true;
        selectingJoinOrCreate = false;
      }}><p class="text-4xl font-bold">Create</p></button
    >
    <button
      class="w-80 h-80 btn mx-4 bg-purple-500 border-purple-500 rounded-3xl"
      on:click={() => {
        isJoin = true;
        enteringUserInfo = true;
        selectingJoinOrCreate = false;
      }}><p class="text-4xl font-bold">Join</p></button
    >
  </div>
{/if}

{#if enteringUserInfo}
  <CreateJoinLobby {isJoin} />
{/if}

{#if isInLobby}
  <MultiplayerLobby
    on:leavelobby={() => {
      isInLobby = false;
      selectingJoinOrCreate = true;
    }}
  />
{/if}
