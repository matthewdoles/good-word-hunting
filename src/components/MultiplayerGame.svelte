<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
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

  let isCorrect = false;
  let guess;
  let round = $multiplayerLobby.round;
  let showGame = true;
  let showWaiting = false;
  let toggleDrawer = false;
  let yScroll;
  let timer = 30;
  let progressValue = 0;
  let interval;

  const progress = tweened(0, {
    delay: 0,
    duration: 1000
  });

  const drawerClasses =
    'drawer-width menu p-4 overflow-y-auto ' +
    'text-base-content bg-white dark:bg-gray-900 min-h-screen ' +
    'border-r-4 border-purple-500';

  $: {
    if ($multiplayerLobby.doneGuessing) {
      showWaiting = false;
    }
    if ($multiplayerLobby.round !== round) {
      guess = '';
      round++;
      showGame = true;
      yScroll = 0;
      timer = 30;
      progressValue = 0;
      progress.set(0);
      createInterval();
    }
  }

  onMount(() => {
    const userIndex = $multiplayerLobby.users.findIndex((user) => user.id === $multiplayerUser.id);
    if (userIndex !== -1) {
      const isGuessing = $multiplayerLobby.users[userIndex].isGuessing;
      if (!isGuessing) {
        guess = $multiplayerLobby.users[userIndex].guess;
        isCorrect = guess.toLowerCase() === $multiplayerLobby.media.title.toLowerCase();
        showGame = false;
        if (!$multiplayerLobby.doneGuessing) {
          showWaiting = true;
        }
        yScroll = 0;
      }
    }
    if ($multiplayerLobby.doneGuessing) {
      showGame = false;
      return;
    }
    createInterval();
  });

  const handleGuessSubmit = (event) => {
    if (event.detail.guess.length > 0) {
      submitGuess(event.detail.guess);
    }
  };

  const submitGuess = (submittedGuess) => {
    guess = submittedGuess;
    isCorrect = guess.toLowerCase() === $multiplayerLobby.media.title.toLowerCase();
    showGame = false;
    showWaiting = true;
    clearInterval(interval);

    let points = isCorrect ? 100 : 0;
    multiplayerLobby.submitGuess($multiplayerUser.id, $multiplayerUser.lobbyId, guess, points);
  };

  const createInterval = () => {
    interval = setInterval(() => {
      if (timer === 0) {
        submitGuess('');
        clearInterval(interval);
      }
      timer = --timer;
      progressValue = ++progressValue;
      progress.set(progressValue);
    }, 1000);
  };
</script>

<svelte:window bind:scrollY={yScroll} />
<div class="drawer drawer-height">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={toggleDrawer} />
  <div class="drawer-content">
    <div class="flex flex-row w-full">
      <div class="w-full">
        <div class="max-w-6xl mx-auto mb-44 px-4 md:px-8">
          {#if showGame}
            <div class="bg-white dark:bg-gray-900 sticky top-0 z-40">
              <div class="mt-4 justify-center w-full font-mono text-6xl countdown dark:text-white">
                <span style={`--value:${timer}`} />
              </div>
              <div class="p-0 m-0 w-full z-40">
                <progress class="progress progress-secondary" value={$progress} max="30" />
              </div>
            </div>
          {/if}
          <div
            class={showGame
              ? 'alert mb-8 rounded-xl bg-purple-500 relative flex justify-center'
              : 'alert my-8 rounded-xl bg-purple-500 relative flex justify-center'}
          >
            <div
              transition:scale
              class="w-10 h-10 absolute left-5 dark:text-white show-toggle cursor-pointer"
              on:click={() => {
                if (toggleDrawer === false) {
                  toggleDrawer = true;
                }
              }}
            >
              <MdMenu />
            </div>
            <p class="text-2xl text-white font-bold uppercase no-margin-top">
              Round {$multiplayerLobby.round}
            </p>
          </div>

          {#if showGame}
            <Game
              cast={[...$multiplayerLobby.media.cast.sort((a, b) => b.order - a.order)]}
              difficulty={$multiplayerLobby.difficulty}
              isMultiplayer="true"
              keywords={$multiplayerLobby.media.keywords}
              similarMedia={$multiplayerLobby.media.similarMedia}
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
              cast={[...$multiplayerLobby.media.cast.sort((a, b) => a.order - b.order)]}
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
  <div class="drawer-side drawer-padding">
    <label for="my-drawer" class="drawer-overlay drawer-opactity-none " />
    <ul
      on:click={() => (toggleDrawer = !toggleDrawer)}
      class={toggleDrawer ? `${drawerClasses} drawer-offset` : `${drawerClasses} cursor-pointer`}
    >
      {#if !toggleDrawer}
        <div transition:scale class="w-10 h-10 absolute right-5 dark:text-white">
          <MdMenu />
        </div>
      {/if}
      {#if toggleDrawer}
        <div transition:scale class="w-10 h-10 absolute right-5 text-red-500 cursor-pointer">
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
  .drawer-height {
    height: calc(100vh - 4rem);
  }
  .drawer-opactity-none {
    opacity: 0 !important;
  }
  .drawer-width {
    width: 400px;
    max-width: 400px;
  }
  .no-margin-top {
    margin-top: 0px !important;
  }
  @media (min-width: 1300px) {
    .drawer-offset {
      margin-left: -6rem !important;
    }
    .drawer-padding {
      padding-left: 5rem;
    }
    .show-toggle {
      display: none;
    }
    .drawer-width {
      width: 400px;
      max-width: 400px;
    }
  }
  @media (max-width: 600px) {
    .drawer-width {
      width: 100vw;
      max-width: 100vw;
    }
  }
</style>
