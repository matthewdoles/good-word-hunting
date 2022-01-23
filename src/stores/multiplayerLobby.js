import { writable } from 'svelte/store';

const multiplayerLobby = writable({ room: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayerLobby.subscribe,
  updateLobbyUsers: (lobbyInfo) => {
    multiplayerLobby.update((items) => {
      return { ...items, room: lobbyInfo.room, users: lobbyInfo.users };
    });
  }
};

export default customMultiplayer;
