<script>
  import { scale } from 'svelte/transition';

  export let profileImage;
  export let username;
  export let isAdmin;
  export let isListItem;
</script>

<div in:scale class={isListItem ? 'flex flex-row items-center' : 'flex flex-col items-center'}>
  <div class="avatar placeholder indicator mt-2">
    {#if isAdmin}
      {#if isListItem}
        <div class="indicator-item badge bg-yellow-500" />
      {:else}
        <div class="indicator-item badge bg-purple-500">Admin</div>
      {/if}
    {/if}
    {#if profileImage}
      <div class={isListItem ? 'rounded-btn w-16 h-16' : 'rounded-btn w-32 h-32'}>
        <img src={profileImage} alt="Profile Pic" />
      </div>
    {:else}
      <div
        class={isListItem
          ? 'bg-neutral-focus text-neutral-content rounded-btn w-16 h-16'
          : 'bg-neutral-focus text-neutral-content rounded-btn w-32 h-32'}
      >
        <span class="text-3xl">{username.charAt(0)}</span>
      </div>
    {/if}
  </div>
  <p
    class={isListItem
      ? 'ml-4 text-xl font-bold dark:text-white'
      : 'my-2 text-xl font-bold dark:text-white'}
  >
    {username}
  </p>
  {#if isListItem}
    <div class="flex ml-auto">
      <div class="stat-value text-purple-500">0</div>
    </div>
  {/if}
</div>
