<script>
  import Avatar from './Avatar.svelte';
  import Game from './Game.svelte';
  import GameResults from './GameResults.svelte';
  import { Circle2 } from 'svelte-loading-spinners';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';
  import filters from '../stores/filters';
  import { shuffleArray } from '../functions/util';
  import {
    getKeywords,
    getMedia,
    getMediaCredits,
    getSimilarMedia
  } from '../functions/http-requests';

  let media;
  let keywords = [];
  let cast = [];
  let similarMedia = [];
  let guess;
  let showGame = true;
  let showWaiting = false;
  let isCorrect = false;
  let yScroll;
  let isLoading = false;

  $: $multiplayerLobby.mediaId, startNewGame($multiplayerLobby.mediaId);

  $: {
    if ($multiplayerLobby.doneGuessing) {
      showWaiting = false;
    }
  }

  const startNewGame = async (mediaId) => {
    isLoading = true;
    yScroll = 0;
    media = await getMedia(mediaId);
    keywords = await getKeywords(mediaId);
    cast = await getMediaCredits(mediaId);
    similarMedia = await getSimilarMedia(mediaId);
    isLoading = false;
  };

  const handleGuessSubmit = (event) => {
    if (event.detail.guess.length > 0) {
      yScroll = 0;
      guess = event.detail.guess;
      isCorrect = guess.toLowerCase() === media.title.toLowerCase();
      showGame = false;
      showWaiting = true;
      let points = isCorrect ? 100 : 0;
      console.log(points);
      multiplayerLobby.submitGuess($multiplayerUser.id, $multiplayerUser.lobbyId, guess, points);
    }
  };
</script>

<div class="flex flex-row w-full">
  <div class="w-1/3 mx-4 mt-10">
    <div class="sticky top-10 py-2">
      <div class="p-4 mb-8 bg-gray-100 text-gray-800 text-center rounded-xl dark:bg-gray-600">
        <div class="flex flex-col mb-4">
          <div class="stat-title uppercase font-bold dark:text-white">Lobby Code</div>
          <div class="stat-value text-purple-500">{$multiplayerUser.lobbyId}</div>
        </div>
        {#each $multiplayerLobby.users as user}
          <Avatar
            profileImage={user.profileImage}
            username={user.username}
            isAdmin={user.isAdmin}
            isGuessing={user.isGuessing}
            isListItem="true"
            score={user.score}
          />
        {/each}
      </div>
    </div>
  </div>
  <div class="w-2/3 mx-4">
    {#if showGame}
      <Game
        {keywords}
        cast={cast.reverse()}
        similarMedia={shuffleArray([...similarMedia, media])}
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
        {media}
        {isCorrect}
        {keywords}
        filter={$filters}
        {cast}
        isMultiplayer="true"
        users={$multiplayerLobby.users}
        on:newgame={() => {}}
      />
    {/if}
  </div>
</div>
