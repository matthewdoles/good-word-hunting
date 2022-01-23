import { writable } from 'svelte/store';
import socket from '../functions/socket';

const multiplayerLobby = writable({ gameInProgress: false, room: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  startGame: (room) => {
    socket.emit('startGame', { room }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  updateLobbyUsers: (lobbyInfo) => {
    multiplayerLobby.update((items) => {
      return {
        ...items,
        room: lobbyInfo.room,
        users: lobbyInfo.users,
        gameInProgress: lobbyInfo.gameInProgress
      };
    });
  },
  updateGameStarted: () => {
    multiplayerLobby.update((items) => {
      return { ...items, gameInProgress: true };
    });
  }
};

export default customMultiplayer;
