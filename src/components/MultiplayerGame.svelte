<script>
  import Avatar from './Avatar.svelte';
  import Game from './Game.svelte';
  import GameResults from './GameResults.svelte';
  import { Circle2 } from 'svelte-loading-spinners';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';
  import filters from '../stores/filters';
  import { shuffleArray } from '../functions/util';

  let guess;
  let round = $multiplayerLobby.round;
  let showGame = true;
  let showWaiting = false;
  let isCorrect = false;
  let yScroll;
  let isLoading = false;

  $: {
    if ($multiplayerLobby.doneGuessing) {
      showWaiting = false;
    }
    if ($multiplayerLobby.round !== round) {
      showGame = true;
      guess = '';
      round++;
      yScroll = 0;
    }
  }

  const handleGuessSubmit = (event) => {
    if (event.detail.guess.length > 0) {
      yScroll = 0;
      guess = event.detail.guess;
      isCorrect = guess.toLowerCase() === $multiplayerLobby.media.title.toLowerCase();
      showGame = false;
      showWaiting = true;
      let points = isCorrect ? 100 : 0;
      multiplayerLobby.submitGuess($multiplayerUser.id, $multiplayerUser.lobbyId, guess, points);
    }
  };

  export const roundReset = () => {};
</script>

<svelte:window bind:scrollY={yScroll} />

<div class="flex flex-row w-full">
  <div class="w-full">
    <div
      class="flex flex-row sticky top-0 p-8 mb-4 bg-white dark:bg-gray-900 border-b-4 border-purple-500 z-50"
    >
      <div class="w-1/12 flex flex-col mt-2">
        <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
        <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
      </div>
      <div class="w-11/12 grid gap-4 md:grid-cols-5 grid-cols-1">
        {#each $multiplayerLobby.users as user}
          <div class="p-4 bg-gray-100 text-gray-800 dark:bg-gray-600 rounded-xl">
            <Avatar
              profileImage={user.profileImage}
              username={user.username}
              isAdmin={user.isAdmin}
              isGuessing={user.isGuessing}
              isListItem="true"
              score={user.score}
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="max-w-6xl mx-auto p-8">
      {#if showGame}
        <Game
          keywords={$multiplayerLobby.media.keywords}
          cast={$multiplayerLobby.media.cast.reverse()}
          similarMedia={shuffleArray([
            ...$multiplayerLobby.media.similarMedia,
            $multiplayerLobby.media
          ])}
          isMultiplayer="true"
          on:guesssubmit={handleGuessSubmit}
        />
      {/if}
      {#if showWaiting}
        <div class="flex flex-col items-center mt-8">
          <p class="text-2xl font-bold dark:text-white mb-8">Waiting for all players to guess...</p>
          <Circle2
            size="200"
            colorOuter="#9333ea"
            colorCenter="#9333ea"
            colorInner="#9333ea"
            unit="px"
          />
        </div>
      {/if}
      {#if $multiplayerLobby.doneGuessing}
        <GameResults
          {guess}
          media={$multiplayerLobby.media}
          {isCorrect}
          keywords={$multiplayerLobby.media.keywords}
          filter={$filters}
          cast={$multiplayerLobby.media.cast}
          isMultiplayer="true"
          users={$multiplayerLobby.users}
          on:newgame={() => {
            multiplayerLobby.startNewRound($multiplayerUser.lobbyId);
          }}
        />
      {/if}
    </div>
  </div>
</div>
