<script>
  import Avatar from './Avatar.svelte';
  import multiplayer from '../stores/multiplayer';
</script>

<div class="mb-8">
  <div class="stat-title uppercase font-bold dark:text-white">Room Code</div>
  <div class="stat-value text-purple-500">{$multiplayer.room}</div>
</div>
<div class="mt-4 mb-8 grid gap-4 md:grid-cols-5 grid-cols-3">
  {#each $multiplayer.users as user}
    <Avatar profileImage={user.profileImage} username={user.username} isAdmin={user.isAdmin} />
  {/each}
</div>
