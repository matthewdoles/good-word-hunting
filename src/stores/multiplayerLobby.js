import { writable } from 'svelte/store';
import socket from '../functions/socket';

const multiplayerLobby = writable({ gameInProgress: false, lobbyId: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  startGame: (lobbyId) => {
    socket.emit('startGame', { lobbyId }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  updateLobbyUsers: ({ lobbyId, users, gameInProgress }) => {
    multiplayerLobby.update((items) => {
      return {
        ...items,
        lobbyId,
        users,
        gameInProgress
      };
    });
  },
  updateGameStarted: ({ gameInProgress }) => {
    console.log(gameInProgress);
    multiplayerLobby.update((items) => {
      return { ...items, gameInProgress };
    });
  }
};

export default customMultiplayer;
