<script>
  import { scale } from 'svelte/transition';

  export let profileImage;
  export let username;
  export let isAdmin;
</script>

<div transition:scale class="flex flex-col items-center">
  <div class="avatar placeholder indicator mt-2">
    {#if isAdmin}
      <div class="indicator-item badge bg-purple-500">Admin</div>
    {/if}
    {#if profileImage}
      <div class="rounded-btn w-32 h-32">
        <img src={profileImage} alt="Profile Pic" />
      </div>
    {:else}
      <div class="bg-neutral-focus text-neutral-content rounded-btn w-32 h-32">
        <span class="text-3xl">{username.charAt(0)}</span>
      </div>
    {/if}
  </div>
  <p class="my-2 text-xl font-bold dark:text-white">{username}</p>
</div>
