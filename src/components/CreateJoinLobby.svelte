<script>
  import Avatar from './Avatar.svelte';
  import multiplayer from '../stores/multiplayer';

  export let isJoin;

  let username;
  let roomNumber;
  let profileImage;
  let previewAvatar = false;

  const createOrJoin = () => {
    if (isJoin) {
      return multiplayer.joinRoom(username, profileImage, roomNumber);
    }
    multiplayer.createRoom(username, profileImage);
  };
</script>

<div class="flex flex-col w-full items-center">
  <input
    class="w-full md:w-1/2 h-20 bg-gray-100 rounded-xl outline-0 text-lg p-4 my-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
    type="text"
    placeholder="Username"
    bind:value={username}
  />
  {#if isJoin}
    <input
      class="w-full md:w-1/2 h-20 bg-gray-100 rounded-xl outline-0 text-lg p-4 my-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
      type="text"
      placeholder="Room Code"
      bind:value={roomNumber}
    />
  {/if}
  <div class="w-full md:w-1/2 flex justify-center items-center">
    <input
      class="w-full h-20 bg-gray-100 rounded-xl outline-0 rounded-r-none outline-0 text-lg p-4 my-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
      type="text"
      placeholder="Profile Image URL (optional)"
      bind:value={profileImage}
    />
    <button
      on:click={() => (previewAvatar = true)}
      class="text-sm h-20 px-2 rounded-l-none rounded-xl outline-0 border-purple-500 bg-purple-500 uppercase font-bold text-white"
      >Preview
    </button>
  </div>
  {#if previewAvatar}
    <Avatar {profileImage} {username} admin="false" />
  {/if}
  <button
    class="w-full md:w-1/2 h-20 btn m-4 p-4 bg-purple-500 border-purple-500 font-bold text-xl"
    on:click={createOrJoin}>{isJoin ? 'Join' : 'Create'}</button
  >
</div>
