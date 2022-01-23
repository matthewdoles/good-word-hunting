<script>
  import multiplayerLobby from '../stores/multiplayerLobby';
  import Avatar from './Avatar.svelte';
</script>

<div class="flex flex-row w-full">
  <div class="w-1/3">
    <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
      {#each $multiplayerLobby.users as user}
        <Avatar
          profileImage={user.profileImage}
          username={user.username}
          isAdmin={user.isAdmin}
          isListItem="true"
        />
      {/each}
    </div>
  </div>
</div>
