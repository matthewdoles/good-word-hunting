<script>
  import { onMount } from 'svelte';
  import { Jumper } from 'svelte-loading-spinners';

  import filters from '../stores/filters';
  import Game from '../components/Game.svelte';
  import GameResults from '../components/GameResults.svelte';
  import { shuffleArray } from '../functions/util';
  import {
    getKeywords,
    getMediaCredits,
    getRandomMedia,
    getSimilarMedia
  } from '../functions/http-requests';

  let media;
  let keywords = [];
  let cast = [];
  let similarMedia = [];
  let guess;
  let isCorrect = false;
  let showGame = true;
  let isLoading = true;
  let yScroll;

  onMount(() => {
    startNewGame();
  });

  const onNewGame = async () => {
    media;
    keywords = [];
    cast = [];
    similarMedia = [];
    guess = '';
    isCorrect = false;
    showGame = true;
    startNewGame();
  };

  const startNewGame = async () => {
    isLoading = true;
    yScroll = 0;
    media = await getRandomMedia();
    keywords = await getKeywords(media.id);
    cast = await getMediaCredits(media.id);
    similarMedia = await getSimilarMedia(media.id);
    isLoading = false;
  };

  const onGuessSubmit = (event) => {
    if (event.detail.guess.length > 0) {
      yScroll = 0;
      guess = event.detail.guess;
      isCorrect = guess.toLowerCase() === media.title.toLowerCase();
      showGame = false;
    }
  };
</script>

<svelte:window bind:scrollY={yScroll} />

<div class="max-w-6xl mx-auto p-4 md:p-8">
  {#if isLoading}
    <div class="flex justify-center">
      <Jumper size="200" color="#9333ea" unit="px" />
    </div>
  {:else if showGame}
    <Game
      cast={cast.reverse()}
      difficulty={$filters.difficulty}
      {keywords}
      similarMedia={shuffleArray([...similarMedia, media])}
      on:guesssubmit={onGuessSubmit}
    />
  {:else}
    <GameResults
      cast={cast.reverse()}
      filter={$filters}
      {guess}
      isAdmin={true}
      {isCorrect}
      {keywords}
      {media}
      on:newgame={onNewGame}
    />
  {/if}
</div>
