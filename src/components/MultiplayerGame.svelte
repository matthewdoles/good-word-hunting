<script>
  import { fly, scale } from 'svelte/transition';
  import { Circle2 } from 'svelte-loading-spinners';
  import MdMenu from 'svelte-icons/md/MdMenu.svelte';
  import MdClose from 'svelte-icons/md/MdClose.svelte';

  import Avatar from './Avatar.svelte';
  import Game from './Game.svelte';
  import GameResults from './GameResults.svelte';
  import filters from '../stores/filters';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';
  import { shuffleArray } from '../functions/util';

  let isCorrect = false;
  let guess;
  let round = $multiplayerLobby.round;
  let showGame = true;
  let showWaiting = false;
  let toggleDrawer = false;
  let yScroll;

  const drawerClasses =
    'drawer-width menu p-4 overflow-y-auto ' +
    'text-base-content bg-white dark:bg-gray-900 min-h-screen ' +
    'border-r-4 border-purple-500 cursor-pointer';

  $: {
    if ($multiplayerLobby.doneGuessing) {
      showWaiting = false;
    }
    if ($multiplayerLobby.round !== round) {
      guess = '';
      round++;
      showGame = true;
      yScroll = 0;
    }
  }

  const handleGuessSubmit = (event) => {
    if (event.detail.guess.length > 0) {
      guess = event.detail.guess;
      isCorrect = guess.toLowerCase() === $multiplayerLobby.media.title.toLowerCase();
      showGame = false;
      showWaiting = true;
      yScroll = 0;

      let points = isCorrect ? 100 : 0;
      multiplayerLobby.submitGuess($multiplayerUser.id, $multiplayerUser.lobbyId, guess, points);
    }
  };
</script>

<svelte:window bind:scrollY={yScroll} />
<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={toggleDrawer} />
  <div class="drawer-content">
    <div class="flex flex-row w-full">
      <div class="w-full">
        <div class="max-w-6xl mx-auto p-8">
          {#if showGame}
            <Game
              cast={$multiplayerLobby.media.cast.reverse()}
              isMultiplayer="true"
              keywords={$multiplayerLobby.media.keywords}
              similarMedia={shuffleArray([
                ...$multiplayerLobby.media.similarMedia,
                $multiplayerLobby.media
              ])}
              on:guesssubmit={handleGuessSubmit}
            />
          {/if}
          {#if showWaiting}
            <div class="flex flex-col items-center mt-8">
              <p class="text-2xl font-bold dark:text-white mb-8">
                Waiting for all players to guess...
              </p>
              <Circle2
                colorOuter="#9333ea"
                colorCenter="#9333ea"
                colorInner="#9333ea"
                size="200"
                unit="px"
              />
            </div>
          {/if}
          {#if $multiplayerLobby.doneGuessing}
            <GameResults
              cast={$multiplayerLobby.media.cast.reverse()}
              filter={$filters}
              {guess}
              isAdmin={$multiplayerUser.isAdmin}
              {isCorrect}
              isMultiplayer="true"
              keywords={$multiplayerLobby.media.keywords}
              media={$multiplayerLobby.media}
              users={$multiplayerLobby.users}
              on:newgame={() => {
                multiplayerLobby.startNewRound($multiplayerUser.lobbyId);
              }}
            />
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side pl-20">
    <label for="my-drawer" class="drawer-overlay drawer-opactity-none " />
    <ul
      on:click={() => {
        toggleDrawer = !toggleDrawer;
      }}
      class={toggleDrawer ? `${drawerClasses} drawer-offset` : drawerClasses}
    >
      {#if !toggleDrawer}
        <div transition:scale class="w-10 h-10 absolute right-5 dark:text-white">
          <MdMenu />
        </div>
      {/if}
      {#if toggleDrawer}
        <div transition:scale class="w-10 h-10 absolute right-5 text-red-500">
          <MdClose />
        </div>
      {/if}
      <li class="flex flex-col mt-2 items-center">
        <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
        <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
      </li>
      {#if toggleDrawer}
        {#each $multiplayerLobby.users as user}
          <div in:fly={{ x: 400, duration: 500 }} class="flex flex-row items-center pb-4 px-2">
            <Avatar
              isAdmin={user.isAdmin}
              isGuessing={user.isGuessing}
              isListItem={true}
              profileImage={user.profileImage}
              username={user.username}
            />
            <p class="ml-4 text-lg font-bold dark:text-white">
              {user.username}
            </p>
            <div class="flex ml-auto">
              <div class="stat-value text-purple-500">{user.score}</div>
            </div>
          </div>
        {/each}
      {/if}
      {#if !toggleDrawer}
        {#each $multiplayerLobby.users as user}
          <div in:fly={{ x: -400, duration: 500 }} class="flex flex-row-reverse pb-4">
            <Avatar
              isAdmin={user.isAdmin}
              isGuessing={user.isGuessing}
              isListItem={true}
              profileImage={user.profileImage}
              username={user.username}
            />
          </div>
        {/each}
      {/if}
    </ul>
  </div>
</div>

<style>
  .drawer-opactity-none {
    opacity: 0 !important;
  }
  .drawer-offset {
    margin-left: -6rem !important;
  }
  .drawer-width {
    width: 400px;
    max-width: 400px;
  }
</style>
