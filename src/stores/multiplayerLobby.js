import { writable } from 'svelte/store';
import socket from '../functions/socket';
import { getRandomMedia } from '../functions/http-requests';

const multiplayerLobby = writable({
  doneGuessing: false,
  gameInProgress: false,
  mediaId: '',
  users: []
});

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  leaveLobby: () => {
    multiplayerLobby.update(() => {
      return { doneGuessing: false, gameInProgress: false, mediaId: '', users: [] };
    });
  },
  startGame: async (lobbyId) => {
    const media = await getRandomMedia();
    socket.emit('startGame', { lobbyId, mediaId: media.id }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
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
  updateGameStarted: ({ gameInProgress, mediaId }) => {
    multiplayerLobby.update((items) => {
      return { ...items, gameInProgress, mediaId };
    });
  }
};

export default customMultiplayer;
