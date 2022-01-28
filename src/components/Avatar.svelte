<script>
  import { DoubleBounce } from 'svelte-loading-spinners';

  export let profileImage;
  export let username;
  export let isAdmin;
  export let isGuessing;
  export let isListItem;
</script>

<div class="avatar placeholder indicator">
  {#if isListItem}
    {#if isGuessing}
      <div class="h-20 indicator-item badge bg-transparent border-transparent">
        <DoubleBounce size="20" color="#9333ea" unit="px" />
      </div>
    {:else}
      <div class="indicator-item badge bg-green-500 border-transparent" />
    {/if}
  {/if}
  {#if !isListItem && isAdmin}
    <div class="indicator-item badge bg-purple-500">Admin</div>
  {/if}
  {#if profileImage}
    <div class={isListItem ? 'rounded-btn w-12 h-12' : 'rounded-btn w-32 h-32'}>
      <img src={profileImage} alt="Profile Pic" />
    </div>
  {:else}
    <div
      class={isListItem
        ? 'bg-neutral-focus text-neutral-content rounded-btn w-12 h-12'
        : 'bg-neutral-focus text-neutral-content rounded-btn w-32 h-32'}
    >
      <span class="text-xl">{username.charAt(0)}</span>
    </div>
  {/if}
</div>
