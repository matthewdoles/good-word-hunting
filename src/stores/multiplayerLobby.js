import { writable } from 'svelte/store';
import socket from '../functions/socket';
import multiplayerUser from './multiplayerUser';
import {
  getKeywords,
  getMedia,
  getMediaCredits,
  getRandomMedia,
  getSimilarMedia
} from '../functions/http-requests';

const multiplayerLobby = writable({
  doneGuessing: false,
  error: '',
  gameInProgress: false,
  mediaId: '',
  round: 1,
  users: []
});

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  leaveLobby: () => {
    multiplayerLobby.update(() => {
      return {
        doneGuessing: false,
        error: '',
        gameInProgress: false,
        media: {},
        round: 1,
        users: []
      };
    });
  },
  startGame: async (lobbyId) => {
    const randomeMedia = await getRandomMedia();
    const media = await getMedia(randomeMedia.id);
    const keywords = await getKeywords(media.id);
    const cast = await getMediaCredits(media.id);
    const similarMedia = await getSimilarMedia(media.id);

    socket.emit(
      'startGame',
      { lobbyId, media: { ...media, keywords, cast, similarMedia } },
      (error) => {
        if (error) {
          multiplayerUser.addError('Sorry, trouble starting game. Please try again.');
        }
      }
    );
  },
  startNewRound: async (lobbyId) => {
    const randomeMedia = await getRandomMedia();
    const media = await getMedia(randomeMedia.id);
    const keywords = await getKeywords(media.id);
    const cast = await getMediaCredits(media.id);
    const similarMedia = await getSimilarMedia(media.id);

    socket.emit(
      'newRoundStarted',
      { lobbyId, media: { ...media, keywords, cast, similarMedia } },
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );
  },
  submitGuess: (userId, lobbyId, guess, points) => {
    socket.emit('submitUserGuess', { userId, lobbyId, guess, points }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  updateLobbyDoneGuessing: () => {
    multiplayerLobby.update((items) => {
      return {
        ...items,
        doneGuessing: true
      };
    });
  },
  updateLobbyUsers: ({ users }) => {
    multiplayerLobby.update((items) => {
      return {
        ...items,
        users
      };
    });
  },
  updateGameStarted: ({ gameInProgress, round, media }) => {
    multiplayerLobby.update((items) => {
      return { ...items, gameInProgress, round, media };
    });
  },
  updateNewRoundStartd: ({ round, media, users }) => {
    multiplayerLobby.update((items) => {
      return {
        ...items,
        doneGuessing: false,
        round,
        media,
        users
      };
    });
  }
};

export default customMultiplayer;
