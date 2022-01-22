<script>
  import Avatar from '../components/Avatar.svelte';
  import multiplayer from '../stores/multiplayer';

  let username = '';
  let profileImage;
  let roomNumber;
  let previewAvatar = false;
  let selectingJoinOrCreate = true;
  let enteringUserInfo = false;
  let isJoin = true;

  $: console.log($multiplayer);

  const createOrJoin = () => {
    if (isJoin) {
      return multiplayer.joinRoom(username, profileImage, roomNumber);
    }
    multiplayer.createRoom(username, profileImage);
  };
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
        placeholder="Room Number"
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
  <p class="dark:text-white">Room # {$multiplayer.room}</p>
  <div class="mt-4 mb-8 grid gap-4 md:grid-cols-5 grid-cols-3">
    {#each $multiplayer.users as user}
      <Avatar profileImage={user.profileImage} username={user.username} isAdmin={user.isAdmin} />
    {/each}
  </div>
{/if}
