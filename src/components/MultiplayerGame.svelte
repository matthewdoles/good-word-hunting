<script>
  import Avatar from './Avatar.svelte';
  import Game from './Game.svelte';
  import multiplayerUser from '../stores/multiplayerUser';
  import multiplayerLobby from '../stores/multiplayerLobby';
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
  let isCorrect = false;
  let yScroll;
  let isLoading = false;

  $: $multiplayerLobby.mediaId, startNewGame($multiplayerLobby.mediaId);

  const startNewGame = async (mediaId) => {
    isLoading = true;
    yScroll = 0;
    media = await getMedia(mediaId);
    keywords = await getKeywords(mediaId);
    cast = await getMediaCredits(mediaId);
    similarMedia = await getSimilarMedia(mediaId);
    isLoading = false;
  };
</script>

<div class="flex flex-row w-full">
  <div class="w-1/3 mx-4 mt-10">
    <div class="sticky top-0 py-2">
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
            isListItem="true"
          />
        {/each}
      </div>
    </div>
  </div>
  <div class="w-2/3 mx-4">
    <Game
      {keywords}
      cast={cast.reverse()}
      similarMedia={shuffleArray([...similarMedia, media])}
      isMultiplayer="true"
      on:guesssubmit={() => {}}
    />
  </div>
</div>
