import { writable } from 'svelte/store';
import socket from '../functions/socket';
import { getRandomMedia } from '../functions/http-requests';

const multiplayerLobby = writable({ gameInProgress: false, mediaId: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  leaveLobby: () => {
    multiplayerLobby.update(() => {
      return { gameInProgress: false, users: [] };
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
