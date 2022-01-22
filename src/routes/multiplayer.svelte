<script>
  import multiplayer from '../stores/multiplayer';

  let username;
  let roomNumber;
  let selectingJoinOrCreate = true;
  let enteringUserInfo = false;
  let isJoin = true;

  $: console.log($multiplayer);

  const createOrJoin = () => {
    if (isJoin) {
      return multiplayer.joinRoom(username, roomNumber);
    }
    multiplayer.createRoom(username);
  };
</script>

{#if selectingJoinOrCreate}
  <div class="flex justify-center w-full">
    <button
      class="w-80 h-80 btn mx-4 bg-purple-500 border-purple-500"
      on:click={() => {
        isJoin = false;
        enteringUserInfo = true;
        selectingJoinOrCreate = false;
      }}>Create Room</button
    >
    <button
      class="w-80 h-80 btn mx-4 bg-purple-500 border-purple-500"
      on:click={() => {
        isJoin = true;
        enteringUserInfo = true;
        selectingJoinOrCreate = false;
      }}>Join Room</button
    >
  </div>
{/if}

{#if enteringUserInfo}
  <div class="flex flex-col w-full items-center">
    <input
      class="w-1/2 bg-gray-100 rounded-xl text-lg p-4 my-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
      type="text"
      placeholder="Username"
      bind:value={username}
    />
    {#if isJoin}
      <input
        class="w-1/2 bg-gray-100 rounded-xl text-lg p-4 my-4 border-4 border-purple-500 font-bold dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="Room Number"
        bind:value={roomNumber}
      />
    {/if}
    <button class="w-1/2 btn m-4 p-4 bg-purple-500 border-purple-500" on:click={createOrJoin}
      >{isJoin ? 'Join' : 'Create'}</button
    >
  </div>
{/if}

<p class="dark:text-white">Room # {$multiplayer.room}</p>
{#each $multiplayer.users as user}
  <p class="dark:text-white">{user.username}</p>
{/each}
